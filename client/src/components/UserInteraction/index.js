import React from 'react';
import Auth from '../utils/auth';
import { Link } from "react-router-dom";

import Comment from './Comment';
import Like from './Like';


function UserInteraction() {
    const loggedIn = Auth.loggedIn();

    return(
        <div className="user-interaction">
            {/* add for each (for comments) */}
            <section className="comments">
                
            </section>
            {/* end foreach */}

            {/* only allow commenting when logged in */}
            {loggedIn ? 
                <form className="comment-form">
                    <div>
                      <textarea name="comment-body"></textarea>
                    </div>

                    <div>
                      <button type="submit">add comment</button>
                      <button type="button" className="like-btn">Like</button>
                    </div>
                </form>
            :
                <div>
                    <Link to="/login">Add to the conversation by logging in</Link>
                </div>
            }
        </div>
    );
}

export default UserInteraction;