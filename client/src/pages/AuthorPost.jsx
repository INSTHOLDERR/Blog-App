import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======

import PostItem from '../components/Postitem';
import "../csss/authorpost.css"
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useParams } from 'react-router-dom';

const AuthorPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // FETCH POSTS
  useEffect(() => {

    const fetchUserPosts = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/posts/users/${id}`
        );

        setPosts(response.data);
        console.log(posts);
        

      } catch (error) {

        toast.error('Error fetching user posts.');

      } finally {

        setLoading(false);

      }

    };

    fetchUserPosts();

  }, [id]);

  const baseURL =
    'http://localhost:5000/uploads/';

  return (

    <section className="author-posts-page">

      <ToastContainer />

      {/* HEADER */}
      <div className="author-posts-header">

        <h1>Author Posts ✍️</h1>

        <p>
          Explore all posts shared by this author.
        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="loading-posts">

          <h2>Loading Posts...</h2>

        </div>

      ) : posts.length > 0 ? (

        <div className="container posts__container">

          {posts.map(
            ({
              _id,
              thumbnail,
              category,
              title,
              description,
              creator,
            }) => {

              const fullThumbnailURL =
                `${baseURL}${thumbnail}`;

              return (

                <PostItem
                  key={_id}
                  postID={_id}
                  thumbnail={fullThumbnailURL}
                  category={category}
                  title={title}
                  description={description}
                  authorID={creator}
                />

              );

            }
          )}

        </div>

      ) : (

        <div className="empty-posts">

          <h2>No Posts Available 😔</h2>

          <p>
            This author has not shared any posts yet.
          </p>

        </div>

      )}

    </section>

  );

};

export default AuthorPosts;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
