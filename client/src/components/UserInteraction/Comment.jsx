import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST_COMMENT, ADD_ATTRACTION_COMMENT } from '../../utils/mutations';



function Comment(props) {
    const [commentBody, setCommentBody] = useState({comment: '' })
    const [ addAttractionComment, { error }] = useMutation(ADD_ATTRACTION_COMMENT);
    const [ addPostComment, { err } ] = useMutation(ADD_POST_COMMENT);

    // handle submit comment
    const handleFormSubmit = async event => {
        event.preventDefault();

      try {
        // decide which type of post the id belongs to and use correct mutation
        if (props.attractionId) {
            await addAttractionComment({ variables: { attractionId: props.attractionId, commentBody: commentBody.comment } })
            .then((res) => {
              // get new comment data and send back to parent to update comment section
              const newComment = res.data.addAttractionComment;
              props.addComment(newComment);
            });
        } else if (props.postId) {
            await addPostComment({ variables: { postId: props.postId, commentBody: commentBody.comment } })
            .then((res) => {
              // get new comment data and send back to parent to update comment section
              const newComment = res.data.addAttractionComment;
              props.addComment(newComment);
            });        
        }
        // clear comment form
        setCommentBody({comment: ''});
        event.target.reset();
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
              <button type="submit" className="sendComment">send <i className="fas fa-paper-plane"></i></button>
            </div>
            {
                (error || err) ? 
                    <div>
                        <p className="error-text" > Comment did not deliver </p>
                    </div>
                : null
            }
        </form>
    )
}

export default Comment;
