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
        </div>
      </div>
    </article>
  );
}
