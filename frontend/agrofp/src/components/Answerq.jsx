import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/Expertcompo/Answerq.css';
import Expertheader from './Expertheader';

const Answerq = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [solution, setsolution] = useState('');
  const [image, setimage] = useState(''); // Base64 string
  const [error, seterror] = useState('');
  const [curuser, setcuruser] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
      setcuruser(storedUser._id);
    }
  }, []);

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

  function answersubmit(e) {
    e.preventDefault();
    const { user, post } = location.state || {};

    const form = { solution, user, post, curuser, image, createdAt: new Date().toISOString() };

    axios.post('http://localhost:9579/answerq', form)
      .then((res) => {
        if (res.status === 200) {
          alert('Answer submitted');
          navigate('/');
        }
      })
      .catch((err) => {
        seterror("Failed to submit answer");
      });
  }

  return (
    <>
  <Expertheader />
  <div className="answer-form-container">
    <h2>Submit Your Answer</h2>
    {error && <div className="error">{error}</div>}
    <form onSubmit={answersubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder=" "
          value={solution}
          onChange={(e) => setsolution(e.target.value)}
          required
        />
        <label>Type your answer here</label>
      </div>

    
      <div className="input-group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label>Upload image (optional)</label>
      </div>

      <button type="submit" className="submit-btn">Submit Answer</button>
    </form>

  
    {image && (
      <div className="image-preview">
        <img src={image} alt="Preview" />
      </div>
    )}
  </div>
</>

  );
};

export default Answerq;
