import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
// import ScriptTag from 'react-script-tag';
import { RiFocus3Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaGripLinesVertical } from 'react-icons/fa';

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
    }
    
    const setTransform = imgEl => {
        imgEl.style.transform = `translate(${transformCenter.x}px,${transformCenter.y}px) scale(${scale})`;
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
        e.target.style.transition = 'default';
        cursor = { 
            x:(e.clientX-transformCenter.x)/scale, 
            y:(e.clientY-transformCenter.y)/scale 
        };
        (e.deltaY>0) ? (scale/=1.02) : (scale*=1.02);
        scale = Math.min(Math.max(transformBounds.scaleMin,scale), transformBounds.scaleMax);
        transformCenter = {
            x: e.clientX - cursor.x*scale,
            y: e.clientY - cursor.y*scale
        };
        setTransform(e.target);
        updateBounds(e.target);
    }

    const recenter = e => {
        const imgEl = e.target.closest("#imap").querySelector("img");
        imgEl.style.transition = `width 0.5s, height 0.5s, transform 0.5s`;
        centerImg(imgEl);
        // imgEl.style.transition = 'default';
    }

    const zoomHandler = e => {
        const imgEl = e.target.closest("#imap").querySelector("img");
        const cmd = e.target.closest("button").className;
        // set zoom pt to center of div
        const zoomCenter = {
            x: imgEl.parentElement.clientHeight/2,
            y: imgEl.parentElement.clientWidth/2
        };
        cursor = { 
            x:(zoomCenter.x-transformCenter.x)/scale, 
            y:(zoomCenter.y-transformCenter.y)/scale 
        };
        switch(cmd) {
            case "zoomIn":
                scale*=1.5;
                break;
            case "zoomOut":
                scale/=1.5;
                break;
            default:
                break;
        }
        scale = Math.min(Math.max(transformBounds.scaleMin,scale), transformBounds.scaleMax);
        transformCenter = {
            x: zoomCenter.x - cursor.x*scale,
            y: zoomCenter.y - cursor.y*scale
        };
        imgEl.style.transition = `width 0.5s, height 0.5s, transform 0.5s`;
        setTransform(imgEl);
        updateBounds(imgEl);
        // imgEl.style.transition = 'default';
    }

    return (
        <div id="imap" className="frame">
            <div className="img-container" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onWheel={wheelHandler}>
                <div className="collapsible">
                    <FaGripLinesVertical size={28}/>
                </div>
                <img src="https://picsum.photos/id/155/5000" id="imap-img" alt="interactive map" useMap='#map' onLoad={imgLoad}></img>
                <map name="map">
                </map>
                <div className="map-ctrl">
                    <button onClick={recenter}><RiFocus3Line /></button>
                    <div className="zoom-ctrl">
                        <button className="zoomIn" onClick={zoomHandler}>
                            <FaPlus />
                        </button>
                        <button className="zoomOut" onClick={zoomHandler}>
                            <FaMinus />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default InteractiveMap;