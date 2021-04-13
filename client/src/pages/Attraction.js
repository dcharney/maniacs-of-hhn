import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import UserInteraction from '../components/UserInteraction';

import { QUERY_ATTRACTION } from "../utils/queries";

function Attraction() {
    const { id } = useParams();
    const [currentAttraction, setAttraction] = useState({});
    const { loading, data: attractionData } = useQuery(QUERY_ATTRACTION, {
        variables: {attractionId: id}
    });

    // stops from re-rendering, calls only when mounted/dependancy attractionData
    useEffect(() => {
        if (attractionData) {setAttraction(attractionData.attraction)};
    },[attractionData]);

    
    return (
        <section>
            <h1>Attraction Page</h1>
            <p>attraction info component</p>
            <UserInteraction attraction={currentAttraction} />
            <h2>{currentAttraction.name}</h2>
        </section>    )
};

export default Attraction;