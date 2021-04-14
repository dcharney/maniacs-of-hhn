import React from "react";


const Comment = (props) => {
    return (
        <>
        <section className="create-post">
          <form onSubmit={props.savePost}>

            <br />
            <br />
            <textarea
              onChange={props.savePostContentToState}
              placeholder="Descriptions"
              rows="8"
              cols="41"
              required
              ref={props.getContent}
            ></textarea>
            <br />
            <br />
            <section className="button-wrapper">
            <button className="button">Submit</button></section>
          </form>
          </section>
        </>
      );
    };
     export default Comment;



