import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = 'http://localhost:5000';
const CATS = ['Agriculture','Business','Education','Entertainment','Art','Investment','Uncategorized','Weather'];
const modules = {toolbar:[[{header:[1,2,3,4,5,6,false]}],['bold','italic','underline'],[{list:'ordered'},{list:'bullet'}],['link','image'],['clean']]};
const formats  = ['header','bold','italic','underline','list','bullet','link','image'];
export default function EditPost() {
  const {id}=useParams(); const navigate=useNavigate();
  const [t,setT]=useState(''); const [c,setC]=useState('Uncategorized');
  const [d,setD]=useState(''); const [th,setTh]=useState(null);
  const [preview,setPreview]=useState(null);
  const [userId,setUserId]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setUserId(localStorage.getItem('userId')||'');
    axios.get(`${API}/api/posts/${id}`).then(({data})=>{setT(data.title);setC(data.category);setD(data.description);setTh(data.thumbnail);setPreview(`${API}/uploads/${data.thumbnail}`);}).catch(()=>setError('Failed to load post.'));
  },[id]);
  const handleFile = e=>{const f=e.target.files[0];setTh(f);if(f)setPreview(URL.createObjectURL(f));};
  const handleSubmit = async e=>{
    e.preventDefault();setError('');setLoading(true);
    const fd=new FormData();fd.append('title',t);fd.append('category',c);fd.append('description',d);
    if(th&&typeof th!=='string') fd.append('thumbnail',th);
    try{
      await axios.patch(`${API}/api/posts/${id}`,fd,{headers:{'Content-Type':'multipart/form-data',Authorization:`Bearer ${localStorage.getItem('token')}`}});
      toast.success('Post updated!');
      setTimeout(()=>navigate(`/myposts/${userId}`),1000);
    }catch(err){setError(err.response?.data?.message||'Update failed.');}
    finally{setLoading(false);}
  };
  return (
    <div className="create-page">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="create-hero" style={{background:'linear-gradient(135deg,#0f172a,#1e293b,#0f172a)'}}>
        <div className="container"><h1>Edit Post ✏️</h1><p>Update and improve your article.</p></div>
      </div>
      <div className="container create-body">
        <div className="create-layout">
          <div className="create-main">
            {error&&<p className="form__error-message" style={{marginBottom:'1rem'}}>{error}</p>}
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
              <div className="create-card">
                <div className="input-group">
                  <label>Post Title</label>
                  <input type="text" value={t} onChange={e=>setT(e.target.value)} placeholder="Title" style={{fontSize:'1.0625rem',padding:'1rem'}} autoFocus/>
                </div>
              </div>
              <div className="create-card">
                <div className="input-group">
                  <label>Content</label>
                  <div className="quill-wrap"><ReactQuill modules={modules} formats={formats} value={d} onChange={setD}/></div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary create-submit" disabled={loading}>
                {loading?<><span className="btn-spinner"/>Saving…</>:'💾 Save Changes'}
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
              {preview&&<img src={preview} alt="" style={{width:'100%',height:'160px',objectFit:'cover',borderRadius:'var(--r-lg)',marginBottom:'.875rem'}}/>}
              <div className="thumb-drop" onClick={()=>document.getElementById('ei').click()}>
                <div className="thumb-placeholder" style={{padding:'1.25rem'}}><span>🔄</span><p>Change Image</p></div>
              </div>
              <input id="ei" type="file" accept="image/png,image/jpg,image/jpeg" onChange={handleFile} style={{display:'none'}}/>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
=======

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
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
