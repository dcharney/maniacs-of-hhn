import React, { useEffect, useState } from 'react';
import './style.css';
import Auth from '../../utils/auth';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { SAVE_ATTRACTION } from "../../utils/mutations";
import { idbPromise } from "../../utils/helpers";


const AttractionCard = ({ currentAttraction }) => {
    const {
        _id,
        name,
        park,
        year,
        description,
        category
    } = currentAttraction;

    const currentPark = (park.park).toLowerCase().replace(/\s/g, "");
    const currentYear = year.year;
    const currentName = name.toLowerCase().replace(/[\s\W]/g, "");

    const { loading, data } = useQuery(QUERY_ME);

    const [ savedAttractionIds, setSavedAttractionIds ] = useState([]);
    const [ saveAttraction ] = useMutation(SAVE_ATTRACTION);

    useEffect(() => {
        if (data) {
            setSavedAttractionIds(data.me.savedAttractions.map(attraction => {return attraction._id}));
            // save to local storage
            data.me.savedAttractions.forEach(attraction => {
                idbPromise('attractions', 'put', attraction);
            });
        }
    }, [data, loading]);
    
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const handleSaveAttraction = async (attractionId) => {
        try {
            await saveAttraction({
                variables: { attractionId: attractionId }
            })
            setSavedAttractionIds([...savedAttractionIds, ])
        } catch (err) {
            console.log(err);
        };
    }

    return (
        <div className="attraction-card">
            <div className="header">
                <div className="logo">
                    <img alt="attraction logo" src={require(`../../assets/attractions/${currentPark}/${currentYear}/${currentName}.jpg`).default}></img>
                </div>
                <div className="title-container">
                    {Auth.loggedIn() && (
                        <button id="save-attraction"
                            onClick={() => handleSaveAttraction(_id)}
                        >
                            {savedAttractionIds?.some((savedAttractionId) => savedAttractionId === _id) ?
                                <FaMinus /> : <FaPlus />
                            }
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