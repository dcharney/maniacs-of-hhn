import React from "react";
import './style.css';

const Post = ({ title, content, editPost, id, deletePost }) => {
  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-content"> {content}</p>
        <a href='#' id='button-element'><span class='fa fa-comment' ></span>Button 1</a>
        <button className="button" onClick={() => editPost(id)}>Edit</button>
        <button className="button" onClick={() => deletePost(id)}>Delete</button>
      </section>
    </>
  );
};
export default Post;