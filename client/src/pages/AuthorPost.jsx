import React, { useState, useEffect } from 'react';
import PostItem from '../components/Postitem';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams(); 

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        console.log("id", _id);
        const response = await axios.get(`http://localhost:5000/api/posts/users/${_id}`);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        toast.error('Error fetching user posts.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [_id]);

  const baseURL = 'http://localhost:5000/uploads/'; 

  return (
    <div>
      <section className="posts">
        {loading ? (
          <h2 className="center">Loading...</h2>
        ) : posts.length > 0 ? (
          <div className="container posts__container">
            {posts.map(({ _id, thumbnail, category, title, description, creator }) => {
              const fullThumbnailURL = `${baseURL}${thumbnail}`;
              console.log("creator", creator);

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
            })}
          </div>
        ) : (
          <h2 className="center">No Post available</h2>
        )}
      </section>
    </div>
  );
};

export default AuthorPosts;
