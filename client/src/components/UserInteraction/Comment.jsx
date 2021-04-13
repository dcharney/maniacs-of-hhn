import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';

import { ADD_POST_COMMENT, ADD_ATTRACTION_COMMENT } from '../../utils/mutations';

//import Reply from './Reply';


function Comment(props) {
    // const targetId = '6074d217ce95c514596d1b4a';// <-- used for testing
    const [commentBody, setCommentBody] = useState({comment: '' })
    const [ addAttractionComment, { error }] = useMutation(ADD_ATTRACTION_COMMENT);
    const [ addPostComment, { err } ] = useMutation(ADD_POST_COMMENT);

    // handle submit comment
    const handleFormSubmit = async event => {
        event.preventDefault();

        console.log(props.attractionId);
        console.log(props.postId);

      try {
        // decide which type of post the id belongs to and use correct mutation
        if (props.attractionId) {
            await addAttractionComment({ variables: { attractionId: props.attractionId, commentBody: commentBody.comment } })
            .then((res) => console.log(res));
            console.log('Comment added to Attraction Post');
        } else if (props.postId) {
            await addPostComment({ variables: { postId: props.postId, commentBody: commentBody.comment } });
            console.log('Comment added to User Post');
        }
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
              <button type="submit">add comment</button>
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
