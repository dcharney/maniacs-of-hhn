import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import UserInteraction from '../components/UserInteraction';
import AttractionCard from '../components/AttractionCard';
import { QUERY_ATTRACTION } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

function Attraction() {
    const { attractionId } = useParams();
    const [currentAttraction, setCurrentAttraction] = useState({});
    const { loading, data } = useQuery(QUERY_ATTRACTION, { variables: { attractionId }});

    useEffect(() => {
        if (data) {
            setCurrentAttraction(data.attraction);
        } else if (!loading) {
            idbPromise('attractions', 'get').then((attractions => {
                // use retrieved data to populate attraction info
                setCurrentAttraction(attractions.filter(attraction => attraction._id === attractionId));
            }))
        }
    }, [data, loading, attractionId] );
    
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