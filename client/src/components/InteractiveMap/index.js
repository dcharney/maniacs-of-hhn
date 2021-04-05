import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
// import ScriptTag from 'react-script-tag';

const InteractiveMap = () => {
    // zoom and pan function
    let panning = false, 
        transformCenter = { x:0, y:0},
        origin = {},
        transformBounds = {},
        imgDimensions = {},
        divDimensions = {},
        cursor = { x:0, y:0},
        scale = 1;
    
    const updateBounds = el => {
        // get image dimensions
        imgDimensions = {
            height: el.height,
            width: el.width
        };
        // get frame dimensions
        divDimensions = {
            height: el.parentElement.clientHeight,
            width: el.parentElement.clientWidth
        };
        // set origin of unscaled image to center in div
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

    const centerImg = el => {
        updateBounds(el);
        // set origin of unscaled image to center in div
        transformCenter = {
            x: origin.x,
            y: origin.y
        }
        setTransform(el);
    }

    const imgLoad = e => {
        centerImg(e.target);
        // calculate max possible zoom out
        imgDimensions = {
            height: e.target.height,
            width: e.target.width
        };
        // get frame dimensions
        divDimensions = {
            height: e.target.parentElement.clientHeight,
            width: e.target.parentElement.clientWidth
        };
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
        console.log(transformBounds);
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
        if (e.target.tagName !== "IMG") {return}
        panning = false;
        e.target.style.cursor = "grab";
        // snap overscroll to bounds
        if (transformCenter.x>transformBounds.left) {transformCenter.x=transformBounds.left}
        if (transformCenter.x<transformBounds.right) {transformCenter.x=transformBounds.right}
        if (transformCenter.y>transformBounds.top) {transformCenter.y=transformBounds.top}
        if (transformCenter.y<transformBounds.bottom) {transformCenter.y=transformBounds.bottom}
        setTransform(e.target);
    }

    const wheelHandler = e => {
        if (e.target.tagName !== "IMG") {return}
        cursor = { 
            x:(e.clientX-transformCenter.x)/scale, 
            y:(e.clientY-transformCenter.y)/scale 
        };
        (e.deltaY>0) ? (scale/=1.1) : (scale*=1.1);
        console.log('scale before: ' + scale)
        scale = Math.min(Math.max(transformBounds.scaleMin,scale), transformBounds.scaleMax);
        console.log('scale after: ' + scale)
        transformCenter = {
            x: e.clientX - cursor.x*scale,
            y: e.clientY - cursor.y*scale
        };
        setTransform(e.target);
        updateBounds(e.target);
    }

    const recenter = e => {
        const imgEl = e.target.closest("#imap").querySelector("img");
        centerImg(imgEl);
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