import React from 'react';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";

import Comment from './Comment';

function UserInteraction(postId) {
    const loggedIn = Auth.loggedIn();

    return(
        <div className="user-interaction">
            {/* add for each (for comments) */}
            <section className="comments">
                
            </section>
            {/* end foreach */}

            {/* only allow commenting when logged in */}
            {loggedIn ? 
                <Comment postId={postId} />
            :
                <div>
                    <Link to="/login">Add to the conversation by logging in</Link>
                </div>
            }
        </div>
    );
}

export default UserInteraction;