import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import '../assets/Askai.css';
import Expertheader from "./Expertheader";
import Farmerheader from "./Farmerheader";

const Askai = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [usertype, setusertype] = useState('')
  const storedUsertype = localStorage.getItem('usertype');
  
  useEffect(() => {
    if (storedUsertype) {
      setusertype(storedUsertype);
    } 
  }, [storedUsertype]);
  
  const askAI = async () => {
    if (!question.trim()) return;
    
    const currentQuestion = question.trim();
    setQuestion("");
    setIsLoading(true);
    
    try {
      const res = await fetch("http://localhost:9579/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });
      const data = await res.json();
      
      // Add new chat item to history
      const newChatItem = {
        id: Date.now(),
        question: currentQuestion,
        answer: data.answer,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatHistory(prev => [...prev, newChatItem]);
    } catch (error) {
      // Add error response to chat history
      const errorChatItem = {
        id: Date.now(),
        question: currentQuestion,
        answer: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      
      setChatHistory(prev => [...prev, errorChatItem]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      askAI();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <>
     {usertype === 'expert' ? <Expertheader /> : <Farmerheader />}
    <div className="askai-container">
     
      
      <div className="askai-content">
        {/* Header Section */}
        <div className="askai-header">
          <div className="askai-icon">��</div>
          <h1 className="askai-title">AgroConnect AI</h1>
          <p className="askai-subtitle">Ask me anything about agriculture, farming, or crop management</p>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <textarea
            className="askai-textarea"
            placeholder="Ask AgroConnect AI anything about farming, crops, soil, or agricultural practices..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          
          <button 
            className={`ask-button ${isLoading ? 'loading' : ''}`}
            onClick={askAI}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? 'Processing...' : 'Ask AI'}
          </button>
       
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <div className="chat-history">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem' }}>Conversation History</h3>
              <button 
                onClick={clearChat}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Clear Chat
              </button>
            </div>
            
            {chatHistory.map((chatItem) => (
              <div key={chatItem.id} className="chat-item">
                {/* Question */}
                <div className="chat-question">
                  <div className="chat-label">Your Question</div>
                  <p className="chat-question-text">{chatItem.question}</p>
                </div>
                
                {/* Answer */}
                <div className={`chat-answer ${chatItem.isError ? 'error' : ''}`}>
                  <div className="chat-label">AI Response</div>
                  <p className="chat-answer-text">{chatItem.answer}</p>
                  <small style={{ color: '#92400e', opacity: 0.7, fontSize: '0.75rem' }}>
                    {chatItem.timestamp}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Askai;