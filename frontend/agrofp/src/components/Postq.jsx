import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Farmerheader from './Farmerheader';
import '../assets/Farmercompo/Postq.css';

const Postq = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [image, setimage] = useState('') 
  const [error, seterror] = useState('')

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // base64 string
    }
    reader.readAsDataURL(file);
  }

  function submitform(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const form = { title, content, userId: user._id, image }

    axios.post('http://localhost:9579/postq', form)
      .then((res) => {
        if (res.status === 200) {
          alert("Question posted successfully!");
          settitle('');
          setcontent('');
          setimage('');
          seterror('');
          navigate('/');
        }
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join(', ')
          seterror(messages)
        } else if (err.response?.data?.error) {
          seterror(err.response.data.error)
        } else {
          seterror("Failed to post question. Please try again.")
        }
      })
  }

  return (
    <>
      <Farmerheader />
      <div className="postq-container">
        <form onSubmit={submitform}>
          <h2>Post Your Doubt</h2>
          <input
            type="text"
            placeholder="Enter your question"
            value={title}
            onChange={(e) => { settitle(e.target.value); seterror(''); }}
            required
          />

          <textarea
            placeholder="Describe your doubt"
            value={content}
            onChange={(e) => { setcontent(e.target.value); seterror(''); }}
            required
          ></textarea>

          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          <button type="submit">Submit</button>
        </form>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  )
}

export default Postq
