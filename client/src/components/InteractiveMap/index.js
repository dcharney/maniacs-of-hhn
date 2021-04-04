import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
// import ScriptTag from 'react-script-tag';

const InteractiveMap = () => {
    // zoom and pan function
    let panning = false, 
        newPos = { x:0, y:0},
        oldPos = { x:0, y:0},
        scale = 1;
    
    const setTransform = e => {
        e.target.style.transform = `translate(${oldPos.x}px,${oldPos.y}px) scale(${scale})`;
    }
    
    const mouseDown = e => {
        panning = true;
        newPos = { 
            x:e.clientX-oldPos.x, 
            y:e.clientY-oldPos.y 
        };
        e.target.style.cursor = "grabbing";
    };

    const mouseUp = e => {
        panning = false;
        e.target.style.cursor = "grab";
        if (oldPos.x>0) {oldPos.x = 0};
        if (oldPos.y>0) {oldPos.y = 0};
        setTransform(e);
        console.log(oldPos)
    }

    const mouseMove = e => {
        if (!panning) {
            return;
        };

        oldPos = { 
            x:e.clientX-newPos.x, 
            y:e.clientY-newPos.y 
        };

        setTransform(e);
    };

    const mouseLeave = e => {
        panning = false;
        e.target.style.cursor = "grab";
        if (oldPos.x>0) {oldPos.x = 0};
        if (oldPos.y>0) {oldPos.y = 0};
        setTransform(e);
    }

    const wheelHandler = e => {
        newPos = {
            x: (e.clientX-oldPos.x)/scale,
            y: (e.clientY-oldPos.y)/scale
        };        
        (e.deltaY>0) ? (scale/=1.1) : (scale*=1.1);
        oldPos = {
            x: e.clientX-newPos.x*scale,
            y: e.clientY-newPos.y*scale
        };
        setTransform(e);
    }

    return (
        <div id="imap" className="container">
            <img onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onWheel={wheelHandler} id="imap-img" alt="interactive map"></img>
        </div>
    );
};

export default InteractiveMap;