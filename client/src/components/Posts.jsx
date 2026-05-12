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