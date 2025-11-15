import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Displayq.css'; 
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
const Displayq = () => {
   const storedUsertype = localStorage.getItem('usertype');
const navigate = useNavigate()
  const [questions, setquestions] = useState([])
  const [usertype, setusertype] = useState('');
  useEffect(()=>{
  if (storedUsertype) {
    setusertype(storedUsertype);
  }
  axios.get('http://localhost:9579/displayq').then((res)=>{
    if(res.status == 200){
      for(let i=0;i<res.data.questions.length;i++){
        console.log(res.data.questions[i].user);
      }
        setquestions(res.data.questions);
    }
    
  }).catch((err)=>{
    console.log(err);
  })

  },[]);
function AnswerQuest(q) {
  navigate('/Answerq', { state: { post: q._id, user: q.user } });
}

  function viewansfunc(q){
    console.log(q);
    navigate('/viewans',{state:{questionId:q._id}});
  }
  return (
  <>
  {usertype === 'expert' ? (
    <Expertheader />
  ) : (
    <Farmerheader />
  )}
 
  <div className="container">
    {questions.map((q, ind) => (
      <div className="question-card" key={ind}>
  <p className="question-author">Asked by <strong>{q.user?.name || 'Unknown'}</strong></p>
  <p className="question-title">Title: {q.title}</p>
  <p className="question-content">Question: {q.content}</p>

  
  {q.image && (
    <div className="question-image">
      <img src={q.image} alt="question" style={{ maxWidth: '300px', maxHeight: '300px' }} />
    </div>
  )}

  <div className="btn-group">
    {usertype === 'expert' && (
      <button className="btn-answer" onClick={() => AnswerQuest(q)}>Answer the question</button>
    )}
    <button className="btn-view" onClick={() => viewansfunc(q)}>View answer</button>
  </div>

   {/* <div className="btn-group">
     <button className="btn-answer" onClick={() => AnswerQuest(q)}>Answer the question</button>
      <button className="btn-view" onClick={() => viewansfunc(q)}>View answer</button>
</div> */}
</div>

    ))}
  </div>
</>

  )
}

export default Displayq
