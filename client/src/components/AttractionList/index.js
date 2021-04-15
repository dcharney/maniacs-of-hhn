import React, { useEffect, useState } from 'react';
import './style.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';


const AttractionList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const myAttractions = data?.me.savedAttractions || [];
    console.log(data?.me.savedAttractions)
    // const [ myAttractions, setAttractions ] = useState([]);

    // if ()
    // useEffect(() => {
    //     if (userData) {
    //         setAttractions(data.me.savedAttractions.map(attraction => {return attraction._id}));
    //     }
    // }, [data])
    
    if (loading || !myAttractions) {
        return <h2>LOADING...</h2>;
    }
    

    return (
        <div>
            <ul>
                {myAttractions.map(attraction => {
                console.log(attraction)
                return (
                    <li key={attraction.name}>
                        <Link to={`/attraction/${attraction._id}`} >{attraction.name}</Link>
                    </li>
                )
            })}
            </ul>
        </div>
    )
};

export default AttractionList;