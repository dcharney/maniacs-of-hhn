import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_ATTRACTION } from "../utils/queries";

function Attraction() {
    const { id } = useParams();
    const [currentAttraction, setAttraction] = useState({});
    const { loading, data: attractionData } = useQuery(QUERY_ATTRACTION, {
        variables: {_id: id}
    });
    if (attractionData) {setAttraction(attractionData.attraction)};
    
    return (
        <section>
            <h1>Attraction Page</h1>
            <p>attraction info component</p>
            <p>user interaction component</p>
            <h2>{currentAttraction.name}</h2>
        </section>
    )
};

export default Attraction;