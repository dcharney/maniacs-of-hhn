import React from "react";

const CreateNewPost = props => {
  return (
    <>
    <section className="create-post">
      <form onSubmit={props.savePost}>
        <h1>New Recipe</h1>
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
          placeholder="Ingredients"
          rows="8"
          cols="41"
          required
          ref={props.getContent}
        ></textarea>
        <br />
        <br />
        <section className="button-wrapper">
        <button className="button">Submit Recipe</button></section>
      </form>
      </section>
    </>
  );
};
export default CreateNewPost;