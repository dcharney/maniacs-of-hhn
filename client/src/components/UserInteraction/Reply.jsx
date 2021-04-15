import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REPLY, DELETE_REPLY } from '../../utils/mutations';
import Moment from 'react-moment';
import Collapsible from 'react-collapsible';

function Reply(props) {
    const [replyBody, setReplyBody] = useState({reply: '' });
    const [ replies, setReplies ] = useState(null);

    const [ addReply, { error }] = useMutation(ADD_REPLY);
    // const [ deleteReplyAction ] = useMutation(DELETE_REPLY);

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

      try {
        if (props.commentId) {
            await addReply({ variables: { commentId: props.commentId, replyBody: replyBody.reply } })
            .then((res) => {
              // get new reply data and update reply section
              const newReply = res.data.addReply;
              updateReplies(newReply);
            });
        }
        // clear reply form
        setReplyBody({reply: ''});
        event.target.reset();
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

    function updateReplies(newReply) {
        console.log(newReply._id)
        setReplies([
            ...replies,
            newReply
        ]);
    }

    // async function deleteReply(id) {
    //     try {
    //         console.log(id)
    //         await deleteReplyAction({ variables: { replyId: id } });
    //         //window.location.reload();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return(
        <div>
            <div className="reply-list">
                {/* map each reply add reply data */}
                { replies ?
                    replies.map((reply) => {
                        const createdAt = parseInt(reply.createdAt);
                        const timestamp = new Date(createdAt);
                        return(
                            <div key={reply._id} className="replies">
                                <div className="reply">
                                        <div className="user-info">
                                            {reply.username}<p><Moment fromNow>{timestamp}</Moment></p>
                                        </div>
                                        <div className="reply-body">
                                            <h5>{reply.replyBody}</h5>
                                        </div>
                                        {/* {reply.username === props.username ?
                                            <button type="button" className="sendComment" onClick={()=> deleteReply(reply._id)} >delete <i className="fas fa-trash-alt"></i></button>
                                        :   
                                            null
                                        } */}
                                </div>
                                {/* <button type="button" className="like-btn"><i className="fas fa-thumbs-up"></i></button> */}
                            </div>
                        );
                    })
                :
                    <div>No replies</div>
                }
            </div>
            {props.loggedIn ? 
                <Collapsible className="reply-form-collapse" trigger="add reply" triggerWhenOpen={<i className="fas fa-ban"></i>}>
                    <form className="reply-form" onSubmit={handleFormSubmit}>
                        <div>
                          <textarea name="reply" onChange={handleChange} placeholder="Type reply.."></textarea>
                        </div>

                        <div>
                          <button type="submit" className="sendComment">send <i className="fas fa-paper-plane"></i></button>
                        </div>
                        {
                            (error) ? 
                                <div>
                                    <p className="error-text" > Reply did not deliver </p>
                                </div>
                            : null
                        }
                    </form>
                </Collapsible>
            :
                <div>
                </div>
            }
        </div>
    )
}

export default Reply;
