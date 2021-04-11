import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';
import { GiSpookyHouse } from 'react-icons/gi';
import Map from './utils';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ATTRACTIONS_SHORT, QUERY_CATEGORIES, QUERY_PARKS, QUERY_YEARS } from "../../utils/queries";

const InteractiveMap = () => {
    const inputRef = useRef(null);

    const { data: categoryData } = useQuery(QUERY_CATEGORIES);
    const { data: yearData } = useQuery(QUERY_YEARS);
    const { data: parkData } = useQuery(QUERY_PARKS);
    const { loading, data: attractionData } = useQuery(QUERY_ATTRACTIONS_SHORT);

    const categories = categoryData?.categories || [];
    const years = yearData?.years || [];
    const parks = parkData?.parks || [];
    const attractions = attractionData?.attractions || [];

    const [ currentCategory, setCategory ] = useState('All');
    const [ currentPark, setPark ] = useState('Florida');
    const [ currentYear, setYear ] = useState('2019');
    
    // useEffect(() => {
    //     // switch to async when image of map is being loaded from db
    //     setTimeout(() => {
    //         const el = document.getElementById("imap-img");
    //         let map = new Map(document);
    //         setNewMap(map);
    //         map.init();
    //     }, 1000);
        
    // },[inputRef]);

    function filterAttractions() {
        if (!currentCategory) {
            return attractions;
        }
        if (currentCategory === 'All') {
            return attractions.filter(attraction => {
                if (
                    attraction.year.year !== currentYear ||
                    attraction.park.park !== currentPark
                ) {
                    return false;
                }
                return true;
            });
        }
        return attractions.filter(attraction => {
            if (
                attraction.category.name !== currentCategory ||
                attraction.year.year !== currentYear ||
                attraction.park.park !== currentPark
            ) {
                return false;
            }
            return true;
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        setCategory(document.getElementById("categories").value);
        setYear(document.getElementById("years").value);
        setPark(document.getElementById("parks").value);
    }

    function imageLoad(e) {
        let map = new Map(document);
        map.init();
    };

    return (
        <>
        <form>
            <label htmlFor="categories">Category Filter: </label>
            <select name="categories" id="categories" value={currentCategory} onChange={submitHandler}>
            <option key='All' value='All'>All</option>
                {categories.map(item => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>
            <label htmlFor="years">Year Selection: </label>
            <select name="years" id="years" value={currentYear} onChange={submitHandler}>
                {years.map(item => (
                    <option key={item.year} value={item.year}>{item.year}</option>
                ))}
            </select>
            <label htmlFor="parks">Park Selection: </label>
            <select name="parks" id="parks" value={currentPark} onChange={submitHandler}>
                {parks.map(item => (
                    <option key={item.park} value={item.park}>{item.park}</option>
                ))}
            </select>
        </form>
        <div id="imap" className="frame">  
            <div className="img-container">
                <div className="map">
                    <img ref={inputRef} src={require(`../../assets/placeholder-${currentPark}.jpg`).default} id="imap-img" alt="interactive map" onLoad={imageLoad}></img>
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