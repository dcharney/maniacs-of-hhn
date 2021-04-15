import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import "./style.css";
import Reply from './Reply';
import Collapsible from 'react-collapsible';
import Moment from 'react-moment';

// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_ATTRACTION_BY_ID, QUERY_POST_BY_ID } from "../../utils/queries";

import Comment from './Comment';

// props should be query data of either an attraction or post/recipe
function UserInteraction(props) {
    const loggedIn = Auth.loggedIn();

    // initialize vars
    const [ postId, setPostId ] = useState(null);
    const [ attractionId, setAttractionId ] = useState(null);
    const [ comments, setComments ] = useState(null);

    // called only once when mounted
    useEffect(() => {
        // if query data passed down is attraction or post prop then add their data to state variables
        if(props.post) {
            setPostId(props.post._id);
            setComments(props.post.comments);
        } else if (props.attraction) {
            setAttractionId(props.attraction._id);
            setComments(props.attraction.comments);
        }
    }, [props]);

    function updateComments(newComment) {
        setComments([
            ...comments,
            newComment
        ]);
    }

    return(
        <section className="user-interaction">
            <Collapsible trigger="View Comments" triggerWhenOpen="Close">
                <div className="comment-list">
                    {/* map each comment add comment data */}
                    { comments ?
                        comments.map((comment) => {
                            const createdAt = parseInt(comment.createdAt);
                            const timestamp = new Date(createdAt);
                            return(
                                <div key={comment._id} className="comments">
                                    <div className="comment">
                                        <div className="user-info">
                                            {comment.username}<p><Moment fromNow>{timestamp}</Moment></p>
                                        </div>
                                        <div className="comment-body">
                                            <h5>{comment.commentBody}</h5>
                                        </div>
                                    </div>
                                    <Collapsible className="reply-collapse" trigger="replies" triggerWhenOpen={<i className="fas fa-chevron-down"></i>}>
                                        <Reply commentReplies={comment.replies} commentId={comment._id} loggedIn={loggedIn} />
                                    </Collapsible>

                                    {/* <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button> */}
                                </div>
                            );
                        })
                    :
                        <div>No comments</div>
                    }
    
                    {/* only allow commenting when logged in */}
                    {loggedIn ? 
                        <Collapsible trigger="add comment" triggerWhenOpen="cancel">
                            <Comment postId={postId} attractionId={attractionId} addComment={(newComment) => {updateComments(newComment)}} />
                        </Collapsible>
                    :
                        <div>
                            <Link to="/login">Add to the conversation by logging in</Link>
                        </div>
                    }
                </div>
            </Collapsible>
        </section>
    );
}

export default UserInteraction;