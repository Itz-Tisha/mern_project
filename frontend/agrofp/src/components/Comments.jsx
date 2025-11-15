import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Farmerheader from './Farmerheader'
import Expertheader from './Expertheader';
import '../assets/Comments.css';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { articleId } = location.state || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [usertype, setusertype] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const usertype = localStorage.getItem('usertype');
    if (usertype) setusertype(usertype);
    if (userData) setUser(userData);

    if (!articleId) {
      setError('No article selected.');
      return;
    }

    // Fetch comments
    axios.get(`http://localhost:9579/comments/${articleId}`)
      .then((res) => {
        console.log(res.data.comments);
        setComments(res.data.comments || []);
      })
      .catch((err) => {
        setError('Failed to load comments');
      });
  }, [articleId]);

  const handlePostComment = async () => {
    if (!newComment.trim() || !user) return;
    
    setIsPosting(true);
    try {
      const res = await axios.post(`http://localhost:9579/comments/${articleId}`, {
        userId: user._id,
        text: newComment,
      });
      
      const newCommentObj = {
        ...res.data.comment,
        user: { name: user.name || 'Anonymous' },
        timestamp: new Date().toLocaleString()
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setError('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handlePostComment();
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
      
      <div className="comments-container">
        <div className="comments-content">
          {/* Header */}
          

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={comment._id || index} className="comment">
                  <div className="comment-header">
                    <div className="comment-author-avatar">
                      {getInitials(comment.user?.name)}
                    </div>
                    <div>
                      <div className="comment-author">
                        {comment.user?.name || 'Anonymous'}
                      </div>
                      <div className="comment-time">
                        {formatTimestamp(comment.createdAt || comment.timestamp)}
                      </div>
                    </div>
                  </div>
                  <p className="comment-text">
                    {comment.comment || comment.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-comments">
              <div className="empty-comments-icon">💬</div>
              <div className="empty-comments-text">No comments yet</div>
              <div className="empty-comments-subtext">Be the first to share your thoughts!</div>
            </div>
          )}

          {/* Comment Form */}
          {user && (
            <div className="comment-form">
              <div className="comment-form-title">Add a Comment</div>
              <textarea
                className="comment-textarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your comment here..."
                disabled={isPosting}
                rows="4"
              />
              <button 
                className={`post-button ${isPosting ? 'loading' : ''}`}
                onClick={handlePostComment}
                disabled={isPosting || !newComment.trim()}
              >
                {isPosting ? 'Posting...' : 'Post Comment'}
              </button>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Tip: Press Ctrl+Enter to submit quickly
              </p>
            </div>
          )}

          {!user && (
            <div className="empty-comments">
              <div className="empty-comments-icon">🔒</div>
              <div className="empty-comments-text">Login Required</div>
              <div className="empty-comments-subtext">Please log in to add comments</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;