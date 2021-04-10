import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';
import { GiSpookyHouse } from 'react-icons/gi';
import Map from './utils';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ATTRACTIONS_SHORT, QUERY_CATEGORIES } from "../../utils/queries";

const InteractiveMap = () => {
    const { data: categoryData } = useQuery(QUERY_CATEGORIES);
    const categories = categoryData?.categories || [];
    const { loading, data } = useQuery(QUERY_ATTRACTIONS_SHORT);
    const attractions = data?.attractions || [];

    const inputRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/id/155/2000');
    const [ map, setNewMap ] = useState({});
    const [ currentCategory, setCurrentCategory ] = useState('');

    useEffect(() => {
        // switch to async when image of map is being loaded from db
        setTimeout(() => {
            const el = document.getElementById("imap-img");
            let map = new Map(document);
            setNewMap(map);
            map.init();
        }, 1000);
        
    },[inputRef]);

    function filterAttractions() {
        if (!currentCategory) {
            return attractions;
        }
        return attractions.filter(attraction => attraction.category.name === currentCategory);
    }

    function submitHandler(e) {
        e.preventDefault();
        setCurrentCategory(document.getElementById("categories").value);
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <label htmlFor="categories">Filter: </label>
            <select name="categories" id="categories">
                {categories.map(item => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>
            <input type="submit" value="Submit" />
        </form>
        <h1>{currentCategory}</h1>
        <div id="imap" className="frame">  
            <div className="img-container">
                <div className="map">
                    <img ref={inputRef} src={imgSrc} id="imap-img" alt="interactive map" ></img>
                    { attractions.length ? (
                        <>
                        {filterAttractions().map(attraction => (
                            <div className="map-icon" key={attraction.name} style={attraction.imap} >
                                <Link to={`/${attraction.name}`} href="#"><GiSpookyHouse className="houses" size={72} /></Link>
                            </div>
                        ))}
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
            <div className="map-ctrl">
                <button id="recenter"><RiFocus3Line /></button>
                <div className="zoom-ctrl">
                    <button id="zoomIn">
                        <FaPlus />
                    </button>
                    <button id="zoomOut">
                        <FaMinus />
                    </button>
                </div>
            </div>
            <div className="collapsible">
                    <FaGripLinesVertical size={28}/>
            </div>
        </div>
        </>
    );
    
};

export default InteractiveMap;