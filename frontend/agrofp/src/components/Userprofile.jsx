import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Expertheader from './Expertheader';
import Farmerheader from './Farmerheader';
import '../assets/Userprofile.css'; 

const Userprofile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      axios.post('http://localhost:9579/userprofile', { userid: userData._id })
        .then(res => {
          if (res.status === 200) {
            setUser(res.data.user);
            setPosts(res.data.posts);
           
          }
        })
        .catch(err => {
          console.error("Something went wrong!!");
        });
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);

  const handleEdit = () => {
    navigate('/editprofile');
  };

  if (!user) return <div className="userprofile-loading">Loading...</div>;

  return (
    <>
      {user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
      <div className="userprofile-container">
          {user.image && (
      <div className="user-image">
        <img
          src={user.image} 
          alt="User"
          style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '50%' }}
        />
      </div>
    )}

        <h2>Welcome, <span className="user-name">{user.name}</span>!</h2>
        <p className="user-role">You are logged in as <strong>{user.usertype}</strong>.</p>

        {user.usertype === 'farmer' ? (
          <>
            <h3>Your Asked Questions</h3>
            {posts.length > 0 ? (
              <ul className="user-posts">
                {posts.map((p, ind) => (
                  <li key={ind} className="post-item">{p.title}</li>
                ))}
              </ul>
            ) : (
              <p>You haven't asked any questions yet.</p>
            )}
          </>
        ) : (
          <>
            {/* Posts for Experts */}
            <h3>Your Posts</h3>
            {posts.length > 0 ? (
              <ul className="user-posts">
                {posts.map((p, ind) => (
                  <li key={ind} className="post-item">{p.title}</li>
                ))}
              </ul>
            ) : (
              <p>You haven't posted any articles yet.</p>
            )}
          </>
        )}

        

        <button className="edit-profile-button" onClick={handleEdit}>Edit Profile</button>
      </div>
    </>
  );
};

export default Userprofile;
