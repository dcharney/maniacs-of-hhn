import React from "react";
import './style.css';

const ModifyPost = (props) => {
  return (
    <><section className="create-post">
      <form>
        <h1 className="allpost">Modify Post</h1>
        <input className="textArea" type='text'
          defaultValue={props.title}
          onChange={props.savePostTitleToState}
          text
          placeholder="title"
          size="41"
        ></input>
        <br />
        <br />
        <textarea className="textArea"
          defaultValue={props.content}
          placeholder="content"
          onChange={props.savePostContentToState}
          rows="8"
          cols="41"
        ></textarea>
        <br />
        <br />
        <section className="button-wrapper">
        <button className="button" onClick ={props.updatePost}>Update Post</button>
        </section>
      </form>
      </section>
    </>
  );
};
export default ModifyPost;