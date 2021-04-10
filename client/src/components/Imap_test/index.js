import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';
import { GiSpookyHouse } from 'react-icons/gi';
import Map from './utils';

const InteractiveMap = () => {
    const inputRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/id/155/5000');
    const [ map, setNewMap ] = useState({});
    useEffect(() => {
        setTimeout(() => {
            console.log("i give up")
            const el = document.getElementById("imap-img");
            // console.log(el);
            // if (el) {setNewMap(new Map(document))};
            // console.log(document)
            // console.log(document.getElementById("imap-img").height)
            let map = new Map(document);
            setNewMap(map);
            console.log(el)
            if (map.mapEl) {
                // console.log(map.imgDimensions)};
                map.imgLoad(el)
            };
        }, 100);
        
    },[inputRef]);

    // load data into map after first page render
    // if (map.mapEl) {map.imgLoad()};
    // // zoom and pan function
    // let panning = false, 
    //     transformCenter = { x:0, y:0},
    //     origin = {},
    //     transformBounds = {},
    //     imgDimensions = {},
    //     divDimensions = {},
    //     cursor = { x:0, y:0},
    //     scale = 1,
    //     mapEl;

    // const mouseUp = e => {
    //     if (e.target.tagName !== "IMG") {return}
    //     panning = false;
    //     e.target.style.cursor = "grab";
    //     // snap overscroll to bounds
    //     if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
    //     if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
    //     if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
    //     if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
    //     setTransform();
    // }

    // const mouseMove = e => {
    //     if (e.target.tagName !== "IMG") {return}
    //     if (!panning) {
    //         return;
    //     };

    //     transformCenter = {
    //         x: e.clientX - cursor.x, 
    //         y: e.clientY - cursor.y
    //     };
    //     setTransform();
    // };

    // const mouseLeave = e => {
    //     if (e.target.tagName !== "IMG") {return}
    //     panning = false;
    //     e.target.style.cursor = "grab";
    //     // snap overscroll to bounds
    //     if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
    //     if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
    //     if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
    //     if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
    //     setTransform();
    // }


    return (
        <div id="imap" className="frame">
            {/* <div onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave}className="img-container" > */}
            <div onMouseDown={map.mouseDown} className="img-container">
                    <div className="map">
                        <img ref={inputRef} src={imgSrc} id="imap-img" alt="interactive map" onLoad={map.imgLoad} ></img>
                        <div className="map-icon">
                            <Link to="/" href="#"><GiSpookyHouse size={72}/></Link>
                        </div>
                    </div>
            </div>
            
        </div>
    );
};

export default InteractiveMap;

// place img into container same size as img so pan and zoom features are tied to div instead of directly to img
// place icons relative to img container so they scroll relative to image 