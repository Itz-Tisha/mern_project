import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../assets/Viewanswer.css';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';

const Viewanswer = () => {
  const type = localStorage.getItem('usertype');
  const location = useLocation();

  const [usertype] = useState(type);
  const [ans, setans] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    if (!location.state || !location.state.questionId) {
      seterror("No question selected.");
      return;
    }

    const form = { questionId: location.state.questionId };
    console.log("Fetching answers for question:", form.questionId);

    axios.post('http://localhost:9579/viewans', form)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setans(res.data.ans);
        }
      })
      .catch(() => {
        seterror("Something went wrong while fetching answers.");
      });
  }, [location.state]);

  return (
    <>
      {usertype === 'expert' ? <Expertheader /> : <Farmerheader />}
      
      <div className="answer-container">
        {error && <div className="error">{error}</div>}

        {ans.length > 0 ? (
          ans.map((answer, idx) => (
            <div className="answer-card" key={idx}>
              <p>{answer.solution}</p>
              <p className="answer-author">
                Answered by: <strong>{answer.curuser?.name || "Unknown"}</strong>
              </p>
              
              {answer.image && (
                <div className="answer-image">
                  <img src={answer.image} alt="Answer" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
              )}

              <p className="answer-date">
                Date: {new Date(answer.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          !error && <p className="no-answers">No answers found.</p>
        )}
      </div>
    </>
  );
};

export default Viewanswer;
