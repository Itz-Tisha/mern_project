


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleTranslate from './Googletranslate';
import '../assets/navbar.css';

const Farmerheader = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [usertype, setUsertype] = useState(null);
  const [islogin, setIslogin] = useState(null); // null means "still loading"
  const [isfarmer, setIsfarmer] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('usertype');
    localStorage.removeItem('islogin');

    setUser(null);
    setUsertype(null);
    setIslogin(false);
    setIsfarmer(false);

    navigate('/');
  };

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUsertype = localStorage.getItem('usertype');
        const storedIslogin = localStorage.getItem('islogin');

        if (storedUser && storedIslogin === 'true') {
          setUser(JSON.parse(storedUser));
          setIslogin(true);

          if (storedUsertype) {
            setUsertype(storedUsertype);
            setIsfarmer(storedUsertype === 'farmer');
          }
        } else {
          setIslogin(false);
        }
      } catch (err) {
        console.error('Error parsing localStorage:', err);
        setIslogin(false);
      }
    };

    loadAuthData();

    // Watch for DOM changes triggered by Google Translate
    const observer = new MutationObserver(() => {
      loadAuthData();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Prevent rendering until localStorage is checked
  if (islogin === null) return null;

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span>AgroConnect</span> <span className="emoji">🌱</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>

          {islogin ? (
            <>
              <Link to="/Postq">Post Doubts</Link>
              <Link to="/articles">Expert Insights</Link>
              <Link to="/displayq">Responses</Link>
              <Link to="/viewweather">AgroWeather</Link>
              <Link to="/notification">Notifications</Link>
              <Link to="/trending_art">Trending Articles</Link>
              <Link to="/DiseaseDetection">desiese detection</Link>
              {/* <Link to ="/speices">speices Prediction</Link> */}
            
              <Link to="/userprofile">Profile</Link>
             
              <GoogleTranslate />
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/articles">Expert Insights</Link>
              <Link to="/viewweather">AgroWeather</Link>
              <Link to="/trending_art">Trending Articles</Link>
               
              
              <GoogleTranslate />
              <Link to="/login">Login</Link>
              <Link to="/sign">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Farmerheader;
