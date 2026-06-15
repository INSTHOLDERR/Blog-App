<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
const CAT = {
  Agriculture:{bg:'#f0fdf4',color:'#15803d'},Business:{bg:'#eff6ff',color:'#1d4ed8'},
  Education:{bg:'#fefce8',color:'#a16207'},Entertainment:{bg:'#fdf4ff',color:'#7e22ce'},
  Art:{bg:'#fff1f2',color:'#be123c'},Investment:{bg:'#f0fdfa',color:'#0f766e'},
  Weather:{bg:'#f0f9ff',color:'#0369a1'},Uncategorized:{bg:'#f8fafc',color:'#475569'},
};
export default function PostItem({ postID, category, title, description, authorID, thumbnail }) {
  const strip = h => h.replace(/<[^>]*>?/gm,'');
  const cat   = CAT[category] || CAT.Uncategorized;
  return (
    <article className="post-card">
      <Link to={`/posts/${postID}`} className="post-card-img-link">
        <img src={thumbnail} alt={title} className="post-card-img" onError={e=>e.target.src='/img/sample.png'}/>
        <span className="post-cat-badge" style={{background:cat.bg,color:cat.color}}>{category}</span>
      </Link>
      <div className="post-card-body">
        <Link to={`/posts/${postID}`}><h2 className="post-card-title">{title.length>56?title.slice(0,56)+'…':title}</h2></Link>
        <p className="post-card-desc">{strip(description).slice(0,115)}…</p>
        <div className="post-card-footer">
          <PostAuthor authorId={authorID}/>
          <Link to={`/posts/${postID}`} className="read-more-btn">Read →</Link>
=======
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
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
        </div>
      </div>
    </article>
  );
<<<<<<< HEAD
}
=======
};

export default PostItem;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
