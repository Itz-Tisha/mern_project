import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../assets/Expertcompo/Postarticle.css';
import Expertheader from './Expertheader';

const Postart = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [image, setimage] = useState('') // Base64 string
  const [error, seterror] = useState('')

  // Convert selected file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // store Base64 string
    };
    reader.readAsDataURL(file);
  };

  function submitted(e){
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'));
    const form = { title, content, userid: user._id, image }

    axios.post('http://localhost:9579/postart', form)
      .then((res)=>{
        if(res.status === 200){
          alert('Article submitted successfully');
          navigate('/')
        }
      })
      .catch((err)=>{
        if (err.response?.data?.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join(', ')
          seterror(messages)
        } else if (err.response?.data?.error) {
          seterror(err.response.data.error)
        } else {
          seterror("Article submission failed. Please try again.")
        }
      })
  }

  return (
    <>
      <Expertheader />
      <div className="postart-container">
        <h2>Post an Article</h2>
        <form onSubmit={submitted}>
          <input
            type="text"
            name="title"
            placeholder="Enter article title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Enter article content"
            rows="6"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          />

          {/* Image input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Optional preview */}
          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px' }} />
            </div>
          )}

          <button type="submit">Post Article</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  )
}

export default Postart
