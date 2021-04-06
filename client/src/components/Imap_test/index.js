import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';
import { GiSpookyHouse } from 'react-icons/gi';

const InteractiveMap = () => {
    // zoom and pan function
    let panning = false, 
        transformCenter = { x:0, y:0},
        origin = {},
        transformBounds = {},
        imgDimensions = {},
        divDimensions = {},
        cursor = { x:0, y:0},
        scale = 1,
        mapEl;
    
    const updateBounds = () => {
        origin = {
            x: (divDimensions.width-imgDimensions.width*scale)/2,
            y:(divDimensions.height-imgDimensions.height*scale)/2
        }
        // set transform boundaries
        transformBounds = {
            ...transformBounds,
            right: (origin.x-(imgDimensions.width*scale-divDimensions.width)/2),
            left: (origin.x+(imgDimensions.width*scale-divDimensions.width)/2),
            top: (origin.y+(imgDimensions.height*scale-divDimensions.height)/2),
            bottom: (origin.y-(imgDimensions.height*scale-divDimensions.height)/2)
        };
        // snap overscroll to bounds
        if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
        if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
        if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
        if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
    };

    const centerImg = () => {
        updateBounds();
        // set origin of image to center in div
        transformCenter = {
            x: origin.x,
            y: origin.y
        }
        setTransform();
    }

    const imgLoad = e => {
        // set image and map dimensions and elements
        mapEl = e.target.closest(".map");
        // get image dimensions
        imgDimensions = {
            height: e.target.closest("img").height,
            width: e.target.closest("img").width
        };
        // get frame dimensions
        divDimensions = {
            height: e.target.closest(".img-container").clientHeight,
            width: e.target.closest(".img-container").clientWidth
        };
        centerImg();
        // calculate max possible zoom out
        const scaleMinWidth = divDimensions.width/imgDimensions.width;
        const scaleMinHeight = divDimensions.height/imgDimensions.height;
        let scaleMin;
        if (scaleMinHeight>scaleMinWidth) {
            scaleMin = scaleMinHeight
        } else {scaleMin = scaleMinWidth};
        transformBounds = {
            ...transformBounds,
            scaleMin,
            scaleMax: 4
        };
    }
    
    const setTransform = () => {
        mapEl.style.transform = `translate(${transformCenter.x}px,${transformCenter.y}px) scale(${scale})`;
    }
    
    const mouseDown = e => {
        if (e.target.tagName !== "IMG") {return}
        e.target.style.transition = 'default';
        panning = true;
        cursor = { 
            x:e.clientX-transformCenter.x, 
            y:e.clientY-transformCenter.y 
        };
        e.target.style.cursor = "grabbing";
    };

    const mouseUp = e => {
        if (e.target.tagName !== "IMG") {return}
        panning = false;
        e.target.style.cursor = "grab";
        // snap overscroll to bounds
        if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
        if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
        if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
        if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
        setTransform();
    }

    const mouseMove = e => {
        if (e.target.tagName !== "IMG") {return}
        if (!panning) {
            return;
        };

        transformCenter = {
            x: e.clientX - cursor.x, 
            y: e.clientY - cursor.y
        };
        setTransform();
    };

    const mouseLeave = e => {
        if (e.target.tagName !== "IMG") {return}
        panning = false;
        e.target.style.cursor = "grab";
        // snap overscroll to bounds
        if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
        if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
        if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
        if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
        setTransform();
    }


    return (
        <div id="imap" className="frame">
            <div onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave}className="img-container" >
                <div className="map">
                    <img src="https://picsum.photos/id/155/5000" id="imap-img" alt="interactive map" onLoad={imgLoad} ></img>
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