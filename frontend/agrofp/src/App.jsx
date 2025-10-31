
import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './components/Login';
import Sign from './components/Sign';
import Farmer from './components/Farmer';
import Expert from './components/Expert';
import Postq from './components/Postq';
import Userprofile from './components/Userprofile';
import Articles from './components/Articles';
import Displayq from './components/Displayq';
import Postart from './components/Postart';
import Answerq from './components/Answerq';
import Viewanswer from './components/Viewanswer';
import Editprofile from './components/Editprofile';
import Viewweather from './components/Viewweather';
import Comments from './components/Comments';
import Notification from './components/Notification';
import Trending_art from './components/Trending_art';
import Diseasedetect from './components/Diseasedetect';
function App() {

 return (
  <>
   

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/farmerpage" element={<Farmer />} />
      <Route path="/expertpage" element={<Expert />} />
      <Route path="/postq" element={<Postq />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/Displayq" element={<Displayq />} />
      <Route path="/postart" element={<Postart />} />
      <Route path="/viewweather" element={<Viewweather />} />
      <Route path="/Answerq" element={<Answerq />} />
      <Route path="/viewans" element={<Viewanswer />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/comments" element={<Comments />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/trending_art" element={<Trending_art />} />
      <Route path="/DiseaseDetection" element={<Diseasedetect />} />
      
    </Routes>
  </>
)

}


export default App
