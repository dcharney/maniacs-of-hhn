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
    console.log(currentAttraction.year)

    useEffect(() => {
        if (data?.attraction.year) {
            setCurrentAttraction(data.attraction);
        } else if (data) {
            console.log('here')
        } else if (!loading) {
            console.log('loading')
            idbPromise('attractions', 'get').then((attractions => {
                // use retrieved data to populate attraction info
                // setCurrentAttraction(attractions.filter(attraction => attraction._id === attractionId));
            }))
        }
    }, [data, loading] );
    
    return (
        <main id="attraction">
            {currentAttraction.year ? (
                <div>
                    <p>{currentAttraction.year.year}</p>
                    <AttractionCard currentAttraction={currentAttraction} />
                    {/* <UserInteraction attraction={currentAttraction} /> */}
                </div>
            ) : (
                <p> Loading... </p>
            )}
        </main>
    )
};

export default Attraction;