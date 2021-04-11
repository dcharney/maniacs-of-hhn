import React from "react";
import './style.css';


const CreateNewPost = props => {
  return (
    <>
    <section className="create-post">
      <form onSubmit={props.savePost}>
        <h1>New Content</h1>
        <input
          type="text"
          onChange={props.savePostTitleToState}
          placeholder="Title"
          size="42"
          required
          ref={props.getTitle}
        ></input>
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
export default CreateNewPost;