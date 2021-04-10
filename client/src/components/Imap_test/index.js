import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';
import { GiSpookyHouse } from 'react-icons/gi';
import Map from './utils';

const InteractiveMap = () => {
    const inputRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/id/155/2000');
    const [ map, setNewMap ] = useState({});
    useEffect(() => {
        setTimeout(() => {
            const el = document.getElementById("imap-img");
            let map = new Map(document);
            setNewMap(map);
            map.init();
        }, 200);
        
    },[inputRef]);

    return (
        <div id="imap" className="frame">
            <div className="img-container">
                <div className="map">
                    <img ref={inputRef} src={imgSrc} id="imap-img" alt="interactive map" ></img>
                    <div className="map-icon">
                        <Link to="/" href="#"><GiSpookyHouse size={72}/></Link>
                    </div>
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
        </div>
    );
};

export default InteractiveMap;