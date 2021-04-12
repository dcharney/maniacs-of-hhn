import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';

import Reply from './Reply';


function Comment(postId) {
    const [commentBody, setCommentBody] = useState({comment: '' })
    const [addComment, { error }] = useMutation(ADD_COMMENT);
  
    const handleFormSubmit = async event => {
      event.preventDefault();
      try {
        await addComment({ variables: { postId: postId, commentBody: commentBody.comment } });
        setCommentBody({comment: ''});
        event.target.reset();
        alert("Comment added!");
      } catch (e) {
        console.log(e)
      }
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
      setCommentBody({
        ...commentBody,
        [name]: value
      });
    };


    return(
        <form className="comment-form" onSubmit={handleFormSubmit}>
            <div>
              <textarea name="comment" onChange={handleChange} placeholder="Type comment.."></textarea>
            </div>

            <div>
              <button type="submit">add comment</button>
              <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button>
            </div>
            {
                error ? 
                    <div>
                        <p className="error-text" >The provided credentials are incorrect</p>
                    </div>
                : null
            }
        </form>
    )
}

export default Comment;
