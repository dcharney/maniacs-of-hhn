import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
// import ScriptTag from 'react-script-tag';

const InteractiveMap = () => {
    // zoom and pan function
    let panning = false, 
        transformCenter = { x:0, y:0},
        transformBounds = {},
        cursor = { x:0, y:0},
        oldPos = { x:0, y:0},
        scale = 1;
    
    // initialize transform params based on loaded image
    const imgLoad = e => {
        // get image dimensions
        const imgDimensions = {
            height: e.target.height,
            width: e.target.width
        };
        // get frame dimensions
        const divDimensions = {
            height: e.target.parentElement.clientHeight,
            width: e.target.parentElement.clientWidth
        };
        // set origin of unscaled image to center in div
        transformCenter = {
            x: (divDimensions.width-imgDimensions.width)/2,
            y:(divDimensions.height-imgDimensions.height)/2
        }
        setTransform(e.target);
        // set transform boundaries
        transformBounds = {
            right: transformCenter.x-(imgDimensions.width-divDimensions.width)/2,
            left: transformCenter.x+(imgDimensions.width-divDimensions.width)/2,
            top: transformCenter.y+(imgDimensions.height-divDimensions.height)/2,
            bottom: transformCenter.y-(imgDimensions.height-divDimensions.height)/2
        };
        console.log(transformBounds)
    }
    
    const setTransform = imgEl => {
        imgEl.style.transform = `translate(${transformCenter.x}px,${transformCenter.y}px) scale(${scale})`;
    }
    
    const mouseDown = e => {
        if (e.target.tagName !== "IMG") {return}
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
        setTransform(e.target);
        console.log(oldPos)
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

        setTransform(e.target);
    };

    const mouseLeave = e => {
        // if (e.target.tagName !== "IMG") {return}
        // panning = false;
        // e.target.style.cursor = "grab";
        // if (oldPos.x>0) {oldPos.x = 0};
        // if (oldPos.y>0) {oldPos.y = 0};
        // setTransform(e.target);
    }

    const wheelHandler = e => {
        // if (e.target.tagName !== "IMG") {return}
        // newPos = {
        //     x: (e.clientX-oldPos.x)/scale,
        //     y: (e.clientY-oldPos.y)/scale
        // };        
        // (e.deltaY>0) ? (scale/=1.1) : (scale*=1.1);
        // oldPos = {
        //     x: e.clientX-newPos.x*scale,
        //     y: e.clientY-newPos.y*scale
        // };
        // setTransform(e.target);
        // console.log(scale)
    }

    const recenter = e => {
        const imgEl = e.target.closest("#imap").querySelector("img");
        oldPos = {
            x:0,
            y:0
        };
        setTransform(imgEl);
    }

    return (
        <div id="imap" className="frame">
            <div className="img-container" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onWheel={wheelHandler}>
                <img src="https://picsum.photos/id/155/1000" id="imap-img" alt="interactive map" useMap='#map' onLoad={imgLoad}></img>
                <map name="map">
                </map>
                <div className="interactives">
                    <button onClick={recenter}>recenter</button>
                </div>
            </div>
            
        </div>
    );
};

export default InteractiveMap;