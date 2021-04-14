import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REPLY } from '../../utils/mutations';
import Moment from 'react-moment';




function Reply(props) {
    const [replyBody, setReplyBody] = useState({reply: '' })
    const [ addReply, { error }] = useMutation(ADD_REPLY);
    const [ replies, setReplies ] = useState(null);


    // called only once when mounted
    useEffect(() => {
        // if query data passed down is attraction or post prop then add their data to state variables
        if(props.commentId) {
            setReplies(props.commentReplies);
        }
    }, [props]);

    // handle submit comment
    const handleFormSubmit = async event => {
        event.preventDefault();

        console.log(props.commentId);

      try {
        if (props.commentId) {
            await addReply({ variables: { commentId: props.commentId, replyBody: replyBody.reply } })
            document.location.reload();
        }
        // setReplyBody({reply: ''});
        // event.target.reset();
      } catch (e) {
        console.log(e)
      }
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
      setReplyBody({
        ...replyBody,
        [name]: value
      });
    };


    return(
        <div>
            <div className="reply-list">
                {/* for each reply add reply data */}
                { replies ?
                    replies.map((reply) => {
                        const createdAt = parseInt(reply.createdAt);
                        const timestamp = new Date(createdAt);
                        return(
                            <div key={reply._id} className="replies">
                                <h5>{reply.replyBody}</h5>
                                <p>{reply.username}</p>
                                <p><Moment fromNow>{timestamp}</Moment></p>
                                {/* <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button> */}
                            </div>
                        );
                    })
                :
                    <div>No replies</div>
                }
                {/* end foreach */}
            </div>

            {props.loggedIn ?
                <form className="reply-form" onSubmit={handleFormSubmit}>
                    <div>
                      <textarea name="reply" onChange={handleChange} placeholder="Type reply.."></textarea>
                    </div>

                    <div>
                      <button type="submit">add reply</button>
                    </div>
                    {
                        (error) ? 
                            <div>
                                <p className="error-text" > Reply did not deliver </p>
                            </div>
                        : null
                    }
                </form>
            :
                <div></div>
            }
        </div>
    )
}

export default Reply;
