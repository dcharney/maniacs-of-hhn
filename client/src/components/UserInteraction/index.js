import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ATTRACTION_BY_ID, QUERY_POST_BY_ID } from "../../utils/queries";

import Comment from './Comment';

// props should be query data of either an attraction or post/recipe
function UserInteraction(props) {
    const loggedIn = Auth.loggedIn();

    // initialize vars
    const [ postId, setPostId ] = useState(null);
    const [ attractionId, setAttractionId ] = useState(null);
    const [ comments, setComments ] = useState([]);

    // may need to use to update new coments
    // useEffect(() => {

    // }, [])

    // if query data passed down is attraction or post prop then add their data to state variables
    if(props.post) {
        setPostId(props.post._id);
        setComments(props.post.comments);

        console.log(comments);
    } else if(props.attraction) {
        setAttractionId(props.attraction._id);
        setComments(props.attraction.comments);

        console.log(comments);
    }

    return(
        <section className="user-interaction">
            {/* add for each (for comments in post (use postID)) */}
            <div className="comments">
            
                <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button>
            </div>
            {/* end foreach */}

            {/* only allow commenting when logged in */}
            {loggedIn ? 
                <Comment postId={postId} attractionId={attractionId} />
            :
                <div>
                    <Link to="/login">Add to the conversation by logging in</Link>
                </div>
            }
        </section>
    );
}

export default UserInteraction;