// Home.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Home.css';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
import weather from '../assets/images/weather.jpg'; 

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [usertype, setUsertype] = useState('');
  const [islogin, setIslogin] = useState(false);
  const [isfarmer, setIsfarmer] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsertype = localStorage.getItem('usertype');
    const storedIslogin = localStorage.getItem('islogin');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsertype) {
      setUsertype(storedUsertype);
      if (storedUsertype === 'farmer') {
        setIsfarmer(true);
      }
    }
    if (storedIslogin) {
      setIslogin(storedIslogin === 'true');
    }
  }, []);

  return (
    <>
      {isfarmer ? <Farmerheader /> : <Expertheader />}

      <header className="hero-section">
        <h1>Welcome to AgroConnect</h1>
        <p>Connecting Farmers and Agricultural Experts</p>
        
        
      </header>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          AgroConnect is a platform that bridges the gap between farmers and agricultural experts.
          Our goal is to empower farmers with expert advice, resources, and a supportive community to boost sustainable farming practices.
        </p>
      </section>

      <section id="features" className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <img src={weather} alt="Weather Updates" />
            <h3>Live Weather</h3>
            <p>Get real-time weather updates tailored for your farming region to plan your crops effectively.</p>
          </div>
          <div className="feature-card">
            <img src={weather} alt="Articles" />
            <h3>Agri Articles</h3>
            <p>Read ,Comments and like articles on the latest farming techniques, tools, and market trends.</p>
          </div>
          <div className="feature-card">
            <img src={weather} alt="Expert Connect" />
            <h3>Expert Connect</h3>
            <p>Ask questions and get answers from experienced agricultural experts within the community.</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <p>© 2025 AgroConnect. All rights reserved.</p>
        <p>Contact us at: support@agroconnect.com</p>
      </footer>
    </>
  );
};

export default Home;
