import React, { useEffect, useState } from 'react';
import '../assets/Articles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
const Articles = () => {
  const [article, setarticle] = useState([]);
  const [user, setUser] = useState(null);
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) 
      setUser(userData);
    console.log('reached at useeffect');
    axios.get('http://localhost:9579/viewarticle')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.arts);
          setarticle(res.data.arts);
        }
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join(', ');
          seterror(messages);
        } else if (err.response?.data?.error) {
          seterror(err.response.data.error);
        } else {
          seterror("Failed to fetch articles. Please try again.");
        }
      });
  }, []);
function func(articleId) {
  console.log("Navigating to comments for article:", articleId);
  navigate('/comments', { state: { articleId } });
}
function like_func(articleId) {
  console.log(articleId);
  console.log("reached at like function12");
  axios.post(`http://localhost:9579/like/${articleId}`, {
    userId: user._id,
  })
  .then((res) => {
    console.log("Like response:", res.data);
    setarticle(prevArticles =>
      prevArticles.map(art =>
        art._id === articleId ? { ...art, like: art.like + 1 } : art
      )
    );
  })
  .catch((err) => {
    console.error("Error while liking article:", err);
  });
}


  return (
    <>
      
      {user && user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
      <div className="articles-wrapper">
        {article.map((art, ind) => (
         
          <div key={ind} className="article-card">
            <div className="article-image">
              {art.image && (
                <img src={art.image} alt="Article" style={{ maxWidth: '300px', maxHeight: '300px' }} />
              )}
             
            </div>
            <div className="article-content">
              <h3 className="article-title">{art.title}</h3>
              <p className="article-content">{art.content}</p>
               <p className="like-count">👍 {art.like} likes</p>
              <div className="article-buttons">
  <button onClick={() => func(art._id)}>Comments</button>
  <button onClick={() => like_func(art._id)}>Like</button>
</div>

             <p className="article-author">Posted by <strong>{art.user?.name || 'Unknown'}</strong></p>
          
            </div>
          </div>
))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Articles;
