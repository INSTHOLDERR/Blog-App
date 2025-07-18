import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, category, title, description, authorID, thumbnail }) => {
  const stripHTML = (html) => html.replace(/<[^>]*>?/gm, '');
  const cleanDescription = stripHTML(description);

  const shortDescription = cleanDescription.length > 145
    ? cleanDescription.substr(0, 145) + '...'
    : cleanDescription;
  const postTitle = title && title.length > 30
    ? title.substr(0, 30) + '...'
    : title;

  const imageSrc = thumbnail.startsWith('http://localhost:5000/uploads/')
    ? thumbnail
    : `http://localhost:5000/uploads/${thumbnail}`;

  return (
    <article className="post">
      <Link to={`/posts/${postID}`}>
        <div className="post__thumbnail">
          <img
            src={imageSrc}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/img/sample.jpg';
            }}
          />
        </div>
      </Link>

      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
          <p>{shortDescription}</p>
        </Link>

        <div className="post__footer">
          <PostAuthor authorId={authorID} />
          {category && (
            <Link to={`/posts/categories/${category}`} className="btn category">
              {category}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostItem;
