import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import UserInteraction from '../components/UserInteraction';
import AttractionCard from '../components/AttractionCard';

import { QUERY_ATTRACTION } from "../utils/queries";

function Attraction() {
    const { id } = useParams();
    const [currentAttraction, setAttraction] = useState({});
    const { data } = useQuery(QUERY_ATTRACTION, { variables: { id: id }});
    const attraction = data?.attraction || {};

    useEffect(() => {
        if (attraction.year) {
            setAttraction(attraction);
        }
    }, [attraction, id] );
    
    return (
        <main id="attraction">
            {currentAttraction.year ? (
                <div>
                    <AttractionCard currentAttraction={currentAttraction} />
                    <UserInteraction attraction={currentAttraction} />
                </div>
            ) : (
                <p> Loading... </p>
            )}
        </main>
    )
};

export default Attraction;