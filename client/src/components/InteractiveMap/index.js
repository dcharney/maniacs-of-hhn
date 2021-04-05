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
    
    const setTransform = imgEl => {
        imgEl.style.transform = `translate(${oldPos.x}px,${oldPos.y}px) scale(${scale})`;
    }
    
    const mouseDown = e => {
        if (e.target.tagName !== "IMG") {return}
        panning = true;
        newPos = { 
            x:e.clientX-oldPos.x, 
            y:e.clientY-oldPos.y 
        };
        e.target.style.cursor = "grabbing";
    };

    const mouseUp = e => {
        if (e.target.tagName !== "IMG") {return}
        panning = false;
        e.target.style.cursor = "grab";
        if (oldPos.x>0) {oldPos.x = 0};
        if (oldPos.y>0) {oldPos.y = 0};
        setTransform(e.target);
        console.log(oldPos)
    }

    const mouseMove = e => {
        if (e.target.tagName !== "IMG") {return}
        if (!panning) {
            return;
        };

        oldPos = { 
            x:e.clientX-newPos.x, 
            y:e.clientY-newPos.y 
        };

        setTransform(e.target);
    };

    const mouseLeave = e => {
        if (e.target.tagName !== "IMG") {return}
        panning = false;
        e.target.style.cursor = "grab";
        if (oldPos.x>0) {oldPos.x = 0};
        if (oldPos.y>0) {oldPos.y = 0};
        setTransform(e.target);
    }

    const wheelHandler = e => {
        if (e.target.tagName !== "IMG") {return}
        newPos = {
            x: (e.clientX-oldPos.x)/scale,
            y: (e.clientY-oldPos.y)/scale
        };        
        (e.deltaY>0) ? (scale/=1.1) : (scale*=1.1);
        oldPos = {
            x: e.clientX-newPos.x*scale,
            y: e.clientY-newPos.y*scale
        };
        setTransform(e.target);
    }

    const recenter = e => {
        const imgEl = e.target.closest("#imap").querySelector("img");
        console.log(imgEl)
        oldPos = {
            x:0,
            y:0
        };
        setTransform(imgEl);
    }

    return (
        <div id="imap" className="frame">
            <div className="img-container" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onWheel={wheelHandler}>
                <img src="https://picsum.photos/id/155/1000" id="imap-img" alt="interactive map" useMap='#map'></img>
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