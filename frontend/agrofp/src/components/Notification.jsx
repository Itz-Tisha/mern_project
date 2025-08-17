import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Notification.css';
import Expertheader from './Expertheader';
import Farmerheader from './Farmerheader';
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
const [usertype, setusertype] = useState('')
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if(storedUser) {
  //     setusertype(storedUser.usertype);
  //   }

  //   const userId = storedUser._id;

  //   axios.get(`http://localhost:9579/notifications/${userId}`)
  //     .then((res) => {
  //       if (res.data.notifications) {
  //         setNotifications(res.data.notifications);
  //       } else {
  //         setError('No notifications found');
  //       }
  //     })
  //     .catch((err) => {
  //       setError('Failed to fetch notifications');
  //     });
  // }, []);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser) {
    setError("User not found in localStorage");
    return;
  }

  setusertype(storedUser.usertype);

  const userId = storedUser._id;

  axios.get(`http://localhost:9579/notifications/${userId}`)
    .then((res) => {
      if (res.data.notifications) {
        setNotifications(res.data.notifications);
      } else {
        setError('No notifications found');
      }
    })
    .catch((err) => {
      setError('Failed to fetch notifications');
    });
}, []);

  function deletenotification() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser._id;
    axios.delete(`http://localhost:9579/notifications/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setNotifications([]);
          alert('Notifications deleted successfully');
        } else {
          setError('Failed to delete notifications');
        } 
      })
      .catch((err) => {
        setError('Failed to delete notifications');
      });
  }

  return (
    <>
      {usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <h2>Notifications</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((note) => (
            <li key={note._id} className="notification-item">
              <div className="notification-content">
                <h3 className="notification-title">
                  <span className="title-text">{note.post?.title || 'No Title'}</span>
                </h3>
                <div className="notification-meta">
                  <span className="notification-expert">
                    {note.experts?.name || 'Unknown Expert'} Answered Your Question
                  </span>
                  {/* <span className="notification-user">
                    {note.curuser?.name}
                  </span> */}
                  <button onClick={deletenotification}> delete notification</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && (
          <div className="empty-notifications">
            <p>No notifications to display</p>
          </div>
        )
      )}
    </div>
    </>
  );
};

export default Notification;