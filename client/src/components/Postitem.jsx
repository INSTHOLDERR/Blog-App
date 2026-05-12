// PostItem.jsx

import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import "../csss/postitem.css"
const PostItem = ({
  postID,
  category,
  title,
  description,
  authorID,
  thumbnail,
}) => {
  const stripHTML = (html) => html.replace(/<[^>]*>?/gm, "");

  const cleanDescription = stripHTML(description);

  const shortDescription =
    cleanDescription.length > 120
      ? cleanDescription.substr(0, 120) + "..."
      : cleanDescription;

  const shortTitle =
    title.length > 40 ? title.substr(0, 40) + "..." : title;

  return (
    <article className="post-card">
      <Link to={`/posts/${postID}`} className="thumbnail-wrapper">
        <img
          src={thumbnail}
          alt={title}
          className="post-image"
          onError={(e) => {
            e.target.src = "/img/sample.jpg";
          }}
        />
      </Link>

      <div className="post-content">
        <div className="category-tag">{category}</div>

        <Link to={`/posts/${postID}`} className="post-title-link">
          <h2>{shortTitle}</h2>
        </Link>

        <p className="post-description">{shortDescription}</p>

        <div className="post-footer">
          <PostAuthor authorId={authorID} />

          <Link to={`/posts/${postID}`} className="read-more-btn">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;