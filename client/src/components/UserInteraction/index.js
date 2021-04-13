import React from 'react';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";

import Comment from './Comment';

function UserInteraction(postId) {
    const loggedIn = Auth.loggedIn();

    return(
        <section className="user-interaction">
            {/* add for each (for comments in post (use postID)) */}
            <div className="comments">
                
            </div>
            {/* end foreach */}

            {/* only allow commenting when logged in */}
            {loggedIn ? 
                <Comment postId={postId} />
            :
                <div>
                    <Link to="/login">Add to the conversation by logging in</Link>
                </div>
            }
        </section>
    );
}

export default UserInteraction;