import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
import '../assets/Editprofile.css';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
  const [user, setuser] = useState(null);
  const [username, setusername] = useState('');
  const [image, setimage] = useState(''); // Base64 string
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setuser(userData);
      axios.post('http://localhost:9579/userprofile', { userid: userData._id })
        .then((res) => {
          if (res.status === 200) {
            setuser(res.data.user);
            setusername(res.data.user.name || '');
            setimage(res.data.user.image || '');
          }
        })
        .catch(err => {
          console.log("Something went wrong!!");
        });
    }
  }, []);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // store Base64 string
    };
    reader.readAsDataURL(file);
  };

  function edit(e) {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user'));
    const form = { userid: userData._id, username, image };

    axios.post('http://localhost:9579/editprofile', form)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          
          console.log("Profile updated");
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {user ? (
        <>
          {user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
          <form onSubmit={edit} className="edit-form fade-in">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setusername(e.target.value)}
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
                <img src={image} alt="Profile Preview" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px', borderRadius: '50%' }} />
              </div>
            )}

            <button type='submit'>Edit Profile</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Editprofile;
