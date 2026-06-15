<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import PostItem from './Postitem';
import { Link } from 'react-router-dom';
const API  = 'http://localhost:5000';
const CATS = ['Agriculture','Business','Education','Entertainment','Art','Investment','Weather','Uncategorized'];
export default function Posts() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState('All');
  useEffect(() => {
    fetch(`${API}/api/posts`).then(r=>r.json()).then(setPosts).catch(()=>{}).finally(()=>setLoading(false));
  }, []);
  const filtered = active==='All' ? posts : posts.filter(p=>p.category===active);
  return (
    <div className="posts-page">
      <div className="posts-hero">
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="hero-eyebrow">✨ Welcome to BlogSpace</div>
          <h1 className="hero-main-title">Stories Worth<br/>Reading</h1>
          <p className="hero-main-sub">Discover thoughtful articles, ideas, and insights from our community of passionate writers.</p>
          <div className="hero-cta-row">
            <Link to="/register" className="btn btn-white btn-lg">Start Writing</Link>
            <Link to="/authors"  className="btn btn-white-outline btn-lg">Meet Authors</Link>
          </div>
        </div>
      </div>
      <div className="filter-bar">
        <div className="container">
          <div className="filter-inner">
            {['All',...CATS].map(c=>(
              <button key={c} onClick={()=>setActive(c)} className={`filter-pill${active===c?' active':''}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="container posts-body">
        {loading ? (
          <div className="page-loading"><div className="spin"/><span>Loading posts…</span></div>
        ) : filtered.length===0 ? (
          <div className="empty-box">
            <div className="empty-icon">📭</div>
            <h2>No posts found</h2>
            <p>{active!=='All'?`No posts in "${active}" yet.`:'Be the first to write something!'}</p>
            <Link to="/create" className="btn btn-primary">Write First Post</Link>
          </div>
        ) : (
          <>
            <p className="results-label">{filtered.length} post{filtered.length!==1?'s':''}{active!=='All'?` in ${active}`:''}</p>
            <div className="posts-grid">
              {filtered.map(({_id,thumbnail,category,title,description,creator})=>(
                <PostItem key={_id} postID={_id} thumbnail={`${API}/uploads/${thumbnail}`}
                  category={category} title={title} description={description} authorID={creator}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
=======
// Posts.jsx

import React, { useState, useEffect } from "react";
import PostItem from "./Postitem";
import "../csss/posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="posts-section">
      <div className="posts-header">
        <h1>Latest Posts</h1>
        <p>Discover trending stories and updates</p>
      </div>

      {posts.length > 0 ? (
        <div className="posts-container">
          {posts.map(
            ({ _id, thumbnail, category, title, description, creator }) => (
              <PostItem
                key={_id}
                postID={_id}
                thumbnail={`http://localhost:5000/uploads/${thumbnail}`}
                category={category}
                title={title}
                description={description}
                authorID={creator}
              />
            )
          )}
        </div>
      ) : (
        <div className="empty-posts">
          <h2>No Posts Available</h2>
        </div>
      )}
    </section>
  );
};

export default Posts;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
