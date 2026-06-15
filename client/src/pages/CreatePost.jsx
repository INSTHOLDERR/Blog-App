import React, { useState } from 'react';
import ReactQuill from 'react-quill';
<<<<<<< HEAD
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = 'http://localhost:5000';
const CATS = ['Agriculture','Business','Education','Entertainment','Art','Investment','Uncategorized','Weather'];
const modules = {toolbar:[[{header:[1,2,3,4,5,6,false]}],['bold','italic','underline','strike'],[{list:'ordered'},{list:'bullet'}],['link','image'],['clean']]};
const formats  = ['header','bold','italic','underline','strike','list','bullet','link','image'];
export default function CreatePost() {
  const [title,desc,category,thumbnail] = [useState(''),useState(''),useState('Uncategorized'),useState(null)];
  const [t,setT]=title,[d,setD]=desc,[c,setC]=category,[th,setTh]=thumbnail;
  const [preview,setPreview]=useState(null);
  const [error,  setError]  =useState('');
  const [loading,setLoading]=useState(false);
  const handleFile = e => { const f=e.target.files[0]; setTh(f); if(f) setPreview(URL.createObjectURL(f)); };
  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    if(!t||!c||!d||!th){setError('All fields are required.');return;}
    setLoading(true);
    const fd=new FormData(); fd.append('title',t); fd.append('category',c); fd.append('description',d.replace(/<\/?p>/g,'')); fd.append('thumbnail',th);
    try {
      await axios.post(`${API}/api/posts`,fd,{headers:{'Content-Type':'multipart/form-data',Authorization:`Bearer ${localStorage.getItem('token')}`}});
      toast.success('Post published! 🎉');
      setT(''); setC('Uncategorized'); setD(''); setTh(null); setPreview(null);
    } catch(err){setError(err.response?.data?.message||'Something went wrong.');}
    finally{setLoading(false);}
  };
  return (
    <div className="create-page">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="create-hero" style={{background:'linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95)'}}>
        <div className="container"><h1>Create New Post ✍️</h1><p>Share your thoughts, ideas, and stories with the world.</p></div>
      </div>
      <div className="container create-body">
        <div className="create-layout">
          <div className="create-main">
            {error&&<p className="form__error-message" style={{marginBottom:'1rem'}}>{error}</p>}
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
              <div className="create-card">
                <div className="input-group">
                  <label>Post Title</label>
                  <input type="text" placeholder="Write a compelling title…" value={t} onChange={e=>setT(e.target.value)} autoFocus style={{fontSize:'1.0625rem',padding:'1rem'}}/>
                </div>
              </div>
              <div className="create-card">
                <div className="input-group">
                  <label>Content</label>
                  <div className="quill-wrap"><ReactQuill modules={modules} formats={formats} value={d} onChange={setD}/></div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary create-submit" disabled={loading}>
                {loading?<><span className="btn-spinner"/>Publishing…</>:'🚀 Publish Post'}
              </button>
            </form>
          </div>
          <aside className="create-sidebar">
            <div className="create-card">
              <p className="sidebar-section-title">Category</p>
              <div className="input-group">
                <select value={c} onChange={e=>setC(e.target.value)}>
                  {CATS.map(cat=><option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="create-card">
              <p className="sidebar-section-title">Cover Image</p>
              <div className="thumb-drop" onClick={()=>document.getElementById('ci').click()}>
                {preview
                  ?<img src={preview} alt="" style={{width:'100%',height:'180px',objectFit:'cover',borderRadius:'var(--r-lg)'}}/>
                  :<div className="thumb-placeholder"><span className="ti">🖼️</span><p>Click to upload</p><small>PNG, JPG — max 5MB</small></div>
                }
              </div>
              <input id="ci" type="file" accept="image/png,image/jpg,image/jpeg" onChange={handleFile} style={{display:'none'}}/>
              {th&&<p className="thumb-name">✅ {th.name}</p>}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
=======
import "../csss/createpost.css"
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  // QUILL TOOLBAR
  const modules = {
    toolbar: [
      [{ header: [1,2,3,4,5,6,false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image'
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

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    if (
      !title ||
      !category ||
      !description ||
      !thumbnail
    ) {

      setError('All fields are required.');
      return;
    }

    const sanitizedDescription =
      description.replace(/<\/?p>/g, '');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append(
      'description',
      sanitizedDescription
    );
    formData.append('thumbnail', thumbnail);

    const token = localStorage.getItem('token');

    try {

      await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Post created successfully!');

      setTitle('');
      setCategory('Uncategorized');
      setDescription('');
      setThumbnail(null);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Something went wrong.'
      );

    }

  };

  return (

    <section className="create-post-page">

      <ToastContainer />

      <div className="create-post-container">

        {/* HEADER */}
        <div className="create-post-header">

          <h1>Create New Post ✍️</h1>

          <p>
            Share your thoughts, ideas, and stories
            with the world.
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
          className="create-post-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}
          <div className="input-group">

            <label>Post Title</label>

            <input
              type="text"
              placeholder="Enter post title"
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

          {/* THUMBNAIL */}
          <div className="input-group">

            <label>Thumbnail</label>

            <input
              type="file"
              className="file-input"
              onChange={(e) =>
                setThumbnail(e.target.files[0])
              }
              accept="image/png, image/jpg, image/jpeg"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="create-post-btn"
          >
            Publish Post 🚀
          </button>

        </form>

      </div>

    </section>

  );

};

export default CreatePost;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
