import React, { useState, useEffect } from 'react';
import PostItem from './Postitem';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            
            try {
                const response = await fetch('http://localhost:5000/api/posts');
                const data = await response.json();
                setPosts(data);
                console.log("posts",data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="posts">
            {posts.length > 0 ? (
                <div className="container posts__container">
                    {posts.map(({ _id, thumbnail, category, title, description, creator }) => (
                        <PostItem 
                            key={_id} 
                            postID={_id} 
                            thumbnail={`http://localhost:5000/uploads/${thumbnail}`} 
                            category={category} 
                            title={title} 
                            description={description} 
                            authorID={creator} 
                        />
                    ))}
                </div>
            ) : (
                <h2 className="center">No Posts Available</h2>
            )}
        </section>
    );
};

export default Posts;
