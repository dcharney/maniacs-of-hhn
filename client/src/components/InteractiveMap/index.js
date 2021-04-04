import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
// import ScriptTag from 'react-script-tag';

const InteractiveMap = () => {
    const [ displayText, setDisplayText ] = useState('consoleloginfo');
    // zoom and pan function
    let panning = false, 
        newPos = { x:0, y:0},
        oldPos = { x:0, y:0};
    
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
    }

    const mouseMove = e => {
        if (!panning) {
            return;
        }

        oldPos = { 
            x:e.clientX-newPos.x, 
            y:e.clientY-newPos.y 
        };

        e.target.style.transform = `translate(${oldPos.x}px,${oldPos.y}px)`;
    }

    const mouseLeave = e => {
        panning = false;
        e.target.style.cursor = "grab";
    }

    return (
        <>
            <div id="imap" className="container">
                <img onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave} id="imap-img" alt="interactive map"></img>
            </div>
            <div className="test-info"> {displayText} </div>
        </>
    );
};

export default InteractiveMap;