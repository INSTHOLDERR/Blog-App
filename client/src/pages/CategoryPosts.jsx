import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../components/Postitem';
import axios from 'axios';

const CategoryPosts = () => {
  const { category } = useParams(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/categories/${category}`);
        setPosts(response.data);
        setLoading(false);
        console.log(posts);
      } catch (err) {
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [category]);

  if (loading) {
    return <h2 className='center'>Loading...</h2>;
  }

  if (error) {
    return <h2 className='center'>{error}</h2>;
  }

  return (
    <section>
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ id, thumbnail, category, title, description, creator }) => (
            <PostItem 
              key={id} 
              postID={id} 
              thumbnail={thumbnail} 
              category={category} 
              title={title} 
              description={description} 
              authorID={creator} 
            />
          ))}
        </div>
      ) : (
        <h2 className='center'>No Posts Available</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
