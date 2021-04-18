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
                setCurrentAttraction(attractions.find(attraction => attraction._id === attractionId));
            }))
        }
    }, [data, loading, attractionId] );
    
    return (
        <main id="attraction">
            {currentAttraction?.year ? (
                <div>
                    <AttractionCard currentAttraction={currentAttraction} />
                    {data && (<UserInteraction attraction={currentAttraction} />)}
                </div>
            ) : (
                <div>
                    {loading ? ( <h2>Loading...</h2>) : (!data && ( <h2> Attraction info not available offline. Please go online to store this attraction to your trip planner! </h2>))
                    }
                </div>
            )}
        </main>
    )
};

export default Attraction;