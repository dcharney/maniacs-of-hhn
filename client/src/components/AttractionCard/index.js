import React from 'react';
import './style.css';
import Auth from '../../utils/auth';
import { FaPlus } from 'react-icons/fa';

const AttractionCard = ({ currentAttraction }) => {
    const {
        name,
        logo,
        park,
        year,
        description,
        // category
    } = currentAttraction;
    const currentPark = (park.park).toLowerCase().replace(/\s/g, "");
    const currentYear = year.year;
    const currentName = name.toLowerCase().replace(/[\s\W]/g, "");

    return (
        <div className="attraction-card">
            <div className="header">
                <div className="logo">
                    <img src={require(`../../assets/attractions/${currentPark}/${currentYear}/${currentName}.jpg`).default}></img>
                </div>
                <div className="title-container">
                    {Auth.loggedIn() && (
                        <button id="save-attraction">
                            <FaPlus />
                        </button>
                    )}
                    <div className="title">
                        <h1>{name}</h1>
                    </div>
                    <div className="tags">
                        <h3 className="tag year">{year.year}</h3>
                        <h3 className="tag year">{park.park}</h3>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="ratings">
                        <div className="rating scare">Scare Meter: PLACEHOLDER FOR SLIDER</div>
                        <div className="rating crowd-index">Avg Crowd Index: PLACEHOLDER FOR SLIDER</div>
                        <div className="rating site-popularity">User Rating: PLACEHOLDER FOR SLIDER</div>
                </div>
                <div className="description">
                    {description ? (
                        <p>{description}</p>
                    ) : (
                        <p> This attraction does not yet have a description! </p>
                    )}
                </div>
            </div>            
        </div>
    );
    
};

export default AttractionCard;