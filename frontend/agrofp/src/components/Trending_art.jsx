import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Trending_art.css';
import Expertheader from './Expertheader';
import Farmerheader from './Farmerheader';
const Trending_art = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usertype, setusertype] = useState('')
  useEffect(() => {
    const storedUsertype = localStorage.getItem('usertype');
    if (storedUsertype) {
      setusertype(storedUsertype);
    }
    axios.get('http://localhost:9579/trending_art') 
      .then((res) => {
        setArticles(res.data.trendingArticles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trending articles:", err);
        setError("Failed to load trending articles");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading-state">
      <p>Loading trending articles...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-state">
      <p>{error}</p>
    </div>
  );

  return (
    <>
    {usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
    <div className="trending-articles-wrapper">
      <div className="trending-header">
        <h2>Trending Articles</h2>
      </div>
      
      {articles.length === 0 ? (
        <div className="empty-state">
          <p>No trending articles found.</p>
        </div>
      ) : (
        <ul className="trending-articles-list">
          {articles.map((article, index) => (
            <li key={article._id} className="trending-article-item">
              <div className="trending-article-content">
                <h3 className="trending-article-title">
                  <span className="rank">{index + 1}</span>
                  <span className="title-text">{article.title}</span>
                </h3>
                <p className="trending-article-excerpt">
                  {article.content?.slice(0, 100)}...
                </p>
                <div className="trending-article-likes">
                  <span className="like-icon">👍</span>
                  <span>Likes: {article.like}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default Trending_art;
