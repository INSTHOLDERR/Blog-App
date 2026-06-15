<<<<<<< HEAD
export { CategoryPosts as default } from './AuthorPost';
=======
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import PostItem from '../components/Postitem';
import "../csss/categorypost.css"
import axios from 'axios';

const CategoryPosts = () => {

  const { category } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // FETCH POSTS
  useEffect(() => {

    const fetchCategoryPosts = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/posts/categories/${category}`
        );

        setPosts(response.data);

      } catch (err) {

        setError('Failed to fetch posts.');

      } finally {

        setLoading(false);

      }

    };

    fetchCategoryPosts();

  }, [category]);

  return (

    <section className="category-posts-page">

      {/* HEADER */}
      <div className="category-header">

        <h1>{category} Posts 📚</h1>

        <p>
          Explore all posts under the
          {` ${category} `} category.
        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="loading-posts">

          <h2>Loading Posts...</h2>

        </div>

      ) : error ? (

        <div className="error-posts">

          <h2>{error}</h2>

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
            }) => (

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

          <h2>No Posts Available 😔</h2>

          <p>
            No posts found in this category.
          </p>

        </div>

      )}

    </section>

  );

};

export default CategoryPosts;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
