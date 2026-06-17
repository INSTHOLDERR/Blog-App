import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../components/Postitem';
import axios from 'axios';
const API = 'http://localhost:5000';

function PostListBody({ posts, loading, emptyMsg }) {
  return (
    <div className="container list-body">
      {loading ? <div className="page-loading"><div className="spin"/><span>Loading…</span></div>
      : posts.length===0
        ? <div className="empty-box"><div className="empty-icon">📭</div><h2>No Posts</h2><p>{emptyMsg}</p></div>
        : (<><p className="results-label">{posts.length} post{posts.length!==1?'s':''}</p>
          <div className="posts-grid">
            {posts.map(({_id,thumbnail,category,title,description,creator})=>(
              <PostItem key={_id} postID={_id} thumbnail={`${API}/uploads/${thumbnail}`}
                category={category} title={title} description={description} authorID={creator}/>
            ))}
          </div></>)
      }
    </div>
  );
}

export function AuthorPost() {
  const {id}=useParams();
  const [posts,  setPosts]  =useState([]);
  const [author, setAuthor] =useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    Promise.all([axios.get(`${API}/api/posts/users/${id}`),axios.get(`${API}/api/users/${id}`)])
      .then(([pr,ur])=>{setPosts(pr.data);setAuthor(ur.data);}).catch(()=>{}).finally(()=>setLoading(false));
  },[id]);
  const av  = author?.avatar?`${API}/uploads/${author.avatar}`:null;
  const ini = author?.name?.[0]?.toUpperCase()||'A';
  return (
    <div className="list-page">
      <div className="list-hero" style={{background:'linear-gradient(135deg,#0f172a,#1e293b)'}}>
        <div className="container">
          {author&&(
            <div className="author-hero-profile">
              <div className="author-hero-avatar">{av?<img src={av} alt={author.name} onError={e=>e.target.src='/img/sample.png'}/>:<div className="aha-placeholder">{ini}</div>}</div>
              <div><h1 className="list-hero-title">{author.name}</h1><p className="list-hero-sub">{author.posts} posts published</p></div>
            </div>
          )}
        </div>
      </div>
      <PostListBody posts={posts} loading={loading} emptyMsg="This author hasn't published yet."/>
    </div>
  );
}

export function CategoryPosts() {
  const {category}=useParams();
  const [posts,  setPosts]  =useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    axios.get(`${API}/api/posts/categories/${category}`).then(r=>setPosts(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[category]);
  return (
    <div className="list-page">
      <div className="list-hero" style={{background:'linear-gradient(135deg,#4c1d95,#6d28d9,#7c3aed)'}}>
        <div className="container">
          <span className="list-hero-badge">Category</span>
          <h1 className="list-hero-title">{category}</h1>
          <p className="list-hero-sub">Explore all posts in this category.</p>
        </div>
      </div>
      <PostListBody posts={posts} loading={loading} emptyMsg={`No posts in "${category}" yet.`}/>
    </div>
  );
}

export default AuthorPost;
