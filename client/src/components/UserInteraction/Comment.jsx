import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';

import { ADD_POST_COMMENT, ADD_ATTRACTION_COMMENT } from '../../utils/mutations';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ATTRACTION_BY_ID, QUERY_POST_BY_ID } from "../../utils/queries";

import Reply from './Reply';


function Comment() {
    const targetId = '6074d217ce95c514596d1b4a';
    const [commentBody, setCommentBody] = useState({comment: '' })
    const [ addAttractionComment, { error }] = useMutation(ADD_ATTRACTION_COMMENT);
    const [ addPostComment, { err } ] = useMutation(ADD_POST_COMMENT);

    const { data: attractionData } = useQuery(QUERY_ATTRACTION_BY_ID, { 
        variables: {id: targetId}
    });

    const { data: postData } = useQuery(QUERY_POST_BY_ID, { 
        variables: {id: targetId}
    });

    const post = postData?.post || null;
    const attraction = attractionData?.attraction || null;

    // handle submit comment
    const handleFormSubmit = async event => {
        event.preventDefault();

        console.log(attraction);
        console.log(post);

      try {
        // decide which type of post the id belongs to and use correct mutation
        if (attraction) {
            await addAttractionComment({ variables: { attractionId: targetId, commentBody: commentBody.comment } })
            .then((res) => console.log(res));
            console.log('Comment added to Attraction Post');
        } else if (post) {
            await addPostComment({ variables: { postId: targetId, commentBody: commentBody.comment } });
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
              <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button>
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
