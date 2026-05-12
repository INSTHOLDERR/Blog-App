import React, { useState, useEffect } from 'react';

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