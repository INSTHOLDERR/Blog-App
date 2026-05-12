import React, { useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
import "../csss/editpost.css"
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

const EditPost = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState('Uncategorized');

  const [description, setDescription] =
    useState('');

  const [thumbnail, setThumbnail] =
    useState(null);

  const [error, setError] = useState('');

  const [userId, setUserId] =
    useState('');

  // FETCH POST
  useEffect(() => {

    const storedUserId =
      localStorage.getItem('userId');

    setUserId(storedUserId);

    const fetchPostDetails = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );

        const post = response.data;

        setTitle(post.title);
        setCategory(post.category);
        setDescription(post.description);
        setThumbnail(post.thumbnail);

      } catch (err) {

        setError(
          'Failed to load post details.'
        );

      }

    };

    fetchPostDetails();

  }, [id]);

  // QUILL
  const modules = {
    toolbar: [
      [{ header: [1,2,3,4,5,6,false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather"
  ];

  // UPDATE POST
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append(
      'description',
      description
    );

    if (
      thumbnail &&
      typeof thumbnail !== 'string'
    ) {

      formData.append(
        'thumbnail',
        thumbnail
      );

    }

    try {

      await axios.patch(
        `http://localhost:5000/api/posts/${id}`,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',

            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      navigate(`/myposts/${userId}`);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Something went wrong.'
      );

    }

  };

  return (

    <section className="edit-post-page">

      <div className="edit-post-container">

        {/* HEADER */}
        <div className="edit-post-header">

          <h1>Edit Post ✏️</h1>

          <p>
            Update and improve your post.
          </p>

        </div>

        {/* ERROR */}
        {error && (

          <p className="form__error-message">
            {error}
          </p>

        )}

        {/* FORM */}
        <form
          className="edit-post-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}
          <div className="input-group">

            <label>Post Title</label>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              autoFocus
            />

          </div>

          {/* CATEGORY */}
          <div className="input-group">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              {POST_CATEGORIES.map((cat) => (

                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>

              ))}

            </select>

          </div>

          {/* DESCRIPTION */}
          <div className="input-group">

            <label>Description</label>

            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
              className="quill-editor"
            />

          </div>

          {/* FILE */}
          <div className="input-group">

            <label>Thumbnail</label>

            <input
              type="file"
              className="file-input"
              onChange={(e) =>
                setThumbnail(
                  e.target.files[0]
                )
              }
              accept="image/png, image/jpg, image/jpeg"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="update-post-btn"
          >
            Update Post
          </button>

        </form>

      </div>

    </section>

  );

};

export default EditPost;