


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';
import GoogleTranslate from './Googletranslate';

const Expertheader = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [usertype, setUsertype] = useState(null);
  const [islogin, setIslogin] = useState(null); // <-- null to differentiate "loading" from false
  const [isfarmer, setIsfarmer] = useState(false);

  useEffect(() => {
    
    const loadAuthData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUsertype = localStorage.getItem('usertype');
        const storedIslogin = localStorage.getItem('islogin');

        console.log('LocalStorage:', {
          storedUser,
          storedUsertype,
          storedIslogin
        });

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
        console.error('Error reading localStorage:', err);
        setIslogin(false);
      }
    };

    loadAuthData();

   
    const langChangeObserver = new MutationObserver(() => {
      loadAuthData();
    });

    langChangeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => langChangeObserver.disconnect();
  }, []);

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('usertype');
    localStorage.removeItem('islogin');

    setUser(null);
    setUsertype(null);
    setIslogin(false);
    setIsfarmer(false);

    navigate('/');
  }

  // Don't render until login state is determined
  if (islogin === null) return null;

  return (
    <nav className="navbar">
      <div className="logo">
        <span>AgroConnect</span> <span className="emoji">🌱</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>

        {islogin ? (
          <>
            <Link to="/displayq">Responses</Link>
            <Link to="/postart">Publish Wisdom</Link>
            <Link to="/articles">Expert Insights</Link>
            <Link to="/trending_art">Trending Articles</Link>
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
  );
};

export default Expertheader;
