import React from "react";
import Reply from './Reply';
import { useMutation } from '@apollo/react-hooks';


function Comment(postId) {

    return(
        <form className="comment-form">
            <div>
              <textarea name="comment-body" placeholder="Type comment.."></textarea>
            </div>

            <div>
              <button type="submit">add comment</button>
              <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button>
            </div>
        </form>
    )
}

export default Comment;
