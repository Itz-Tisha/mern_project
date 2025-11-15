// // import React, { useEffect, useState } from 'react';
// // import '../assets/Articles.css';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import Farmerheader from './Farmerheader';
// // import Expertheader from './Expertheader';
// // const Articles = () => {
// //   const [article, setarticle] = useState([]);
// //   const [user, setUser] = useState(null);
// //   const [error, seterror] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const userData = JSON.parse(localStorage.getItem('user'));
// //     if (userData) 
// //       setUser(userData);
// //     console.log('reached at useeffect');
// //     axios.get('http://localhost:9579/viewarticle')
// //       .then((res) => {
// //         if (res.status === 200) {
// //           console.log(res.data.arts);
// //           setarticle(res.data.arts);
// //         }
// //       })
// //       .catch((err) => {
// //         if (err.response?.data?.errors) {
// //           const messages = err.response.data.errors.map(e => e.msg).join(', ');
// //           seterror(messages);
// //         } else if (err.response?.data?.error) {
// //           seterror(err.response.data.error);
// //         } else {
// //           seterror("Failed to fetch articles. Please try again.");
// //         }
// //       });
// //   }, []);
// // function func(articleId) {
// //   console.log("Navigating to comments for article:", articleId);
// //   navigate('/comments', { state: { articleId } });
// // }
// // function like_func(articleId) {
// //   console.log(articleId);
// //   console.log("reached at like function12");
// //   axios.post(`http://localhost:9579/like/${articleId}`, {
// //     userId: user._id,
// //   })
// //   .then((res) => {
// //     console.log("Like response:", res.data);
// //     setarticle(prevArticles =>
// //       prevArticles.map(art =>
// //         art._id === articleId ? { ...art, like: art.like + 1 } : art
// //       )
// //     );
// //   })
// //   .catch((err) => {
// //     console.error("Error while liking article:", err);
// //   });
// // }


// //   return (
// //     <>
      
// //       {user && user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
// //       <div className="articles-wrapper">
// //         {article.map((art, ind) => (
         
// //           <div key={ind} className="article-card">
// //             <div className="article-image">
// //               {art.image && (
// //                 <img src={art.image} alt="Article" style={{ maxWidth: '300px', maxHeight: '300px' }} />
// //               )}
             
// //             </div>
// //             <div className="article-content">
// //               <h3 className="article-title">{art.title}</h3>
// //               <p className="article-content">{art.content}</p>
// //                <p className="like-count">👍 {art.like} likes</p>
// //               <div className="article-buttons">
// //                 {user ? (
// //                   <>
// //                     <button onClick={() => func(art._id)}>Comments</button>
// //                     <button onClick={() => like_func(art._id)}>Like</button>
// //                   </>
                
// //                 ) : null}
 
// // </div>

// //              <p className="article-author">Posted by <strong>{art.user?.name || 'Unknown'}</strong></p>
          
// //             </div>
// //           </div>
// // ))}
// //       </div>
// //       {error && <p className="error-message">{error}</p>}
// //     </>
// //   );
// // };

// // export default Articles;
// import React, { useEffect, useState } from 'react';
// import '../assets/Articles.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Farmerheader from './Farmerheader';
// import Expertheader from './Expertheader';

// const Articles = () => {
//   const [article, setarticle] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, seterror] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (userData) setUser(userData);

//     axios.get('http://localhost:9579/viewarticle')
//       .then((res) => {
//         if (res.status === 200) {
//           setarticle(res.data.arts);
//         }
//       })
//       .catch((err) => {
//         if (err.response?.data?.errors) {
//           const messages = err.response.data.errors.map(e => e.msg).join(', ');
//           seterror(messages);
//         } else if (err.response?.data?.error) {
//           seterror(err.response.data.error);
//         } else {
//           seterror("Failed to fetch articles. Please try again.");
//         }
//       });
//   }, []);

//   function func(articleId) {
//     navigate('/comments', { state: { articleId } });
//   }

//   function like_func(articleId) {
//     axios.post(`http://localhost:9579/like/${articleId}`, {
//       userId: user._id,
//     })
//     .then((res) => {
//       setarticle(prevArticles =>
//         prevArticles.map(art =>
//           art._id === articleId ? { ...art, like: art.like + 1 } : art
//         )
//       );
//     })
//     .catch((err) => {
//       console.error("Error while liking article:", err);
//     });
//   }

//   // 🔹 Function to read article aloud
//   // function readArticle(text) {
//   //   if ("speechSynthesis" in window) {
//   //     window.speechSynthesis.cancel(); 
//   //     const lan = localStorage.getItem('preferredLanguage') || 'en-US';
//   //     // stop previous speech
//   //     const utterance = new SpeechSynthesisUtterance(text);
//   //     utterance.lang = "gu-IN"; // change language if needed
//   //     utterance.rate = 1; // speed (0.5 - 2)
//   //     utterance.pitch = 1; // pitch
//   //     window.speechSynthesis.speak(utterance);
//   //   } else {
//   //     alert("Sorry, your browser does not support text-to-speech.");
//   //   }
//   // }
// // function readArticle(text) {
// //   console.log(window.speechSynthesis.getVoices());

// //   if (!window.speechSynthesis) {
// //     alert("Sorry, your browser does not support text-to-speech.");
// //     return;
// //   }

// //   // Stop any ongoing speech
// //   window.speechSynthesis.cancel();

// //   // Get preferred language from Google Translate
// //   const preferredLang = localStorage.getItem("preferredLanguage") || "en";

// //   // Language mapping to voices (fallbacks)
// //   const langMap = {
// //     en: "en-US",
// //     hi: "hi-IN",
// //     gu: "gu-IN",
// //     es: "es-ES",
// //     fr: "fr-FR",
// //     de: "de-DE",
// //     "zh-CN": "zh-CN"
// //   };

// //   const targetLang = langMap[preferredLang] || "en-US";
// // console.log(targetLang);
// //   const utterance = new SpeechSynthesisUtterance(text);
// //   utterance.lang = targetLang;
// //   utterance.rate = 1;
// //   utterance.pitch = 1;

// //   // Select the most appropriate voice
// //   const voices = speechSynthesis.getVoices();
// //   const matchedVoice = voices.find((voice) => voice.lang === targetLang);

// //   if (matchedVoice) {
// //     utterance.voice = matchedVoice;
// //   } else {
// //     console.warn(`No exact voice found for ${targetLang}, using default.`);
// //   }

// //   // If voices are not loaded yet, delay speaking
// //   if (voices.length === 0) {
// //     window.speechSynthesis.onvoiceschanged = () => {
// //       const updatedVoices = speechSynthesis.getVoices();
// //       const updatedVoice = updatedVoices.find((v) => v.lang === targetLang);
// //       if (updatedVoice) utterance.voice = updatedVoice;
// //       window.speechSynthesis.speak(utterance);
// //     };
// //   } else {
// //     window.speechSynthesis.speak(utterance);
// //   }
// // }
// function readArticle(text) {
//   const preferredLang = localStorage.getItem("preferredLanguage") || "en";
//   const langCode = preferredLang.slice(0,2); // 'en', 'hi', 'gu', etc.

//   const audio = new Audio(
//     `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`
//   );
//   audio.play();
// }



//   return (
//     <>
//       {user && user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
//       <div className="articles-wrapper">
//         {article.map((art, ind) => (
//           <div key={ind} className="article-card">
//             <div className="article-image">
//               {art.image && (
//                 <img src={art.image} alt="Article" style={{ maxWidth: '300px', maxHeight: '300px' }} />
//               )}
//             </div>
//             <div className="article-content">
//               <h3 className="article-title">{art.title}</h3>

//               {/* Article text */}
//               <p className="article-content">{art.content}</p>

//               {/* 🔹 Add a Read Aloud button */}
//               <button onClick={() => readArticle(art.content)}>🔊 Read Article</button>

//               <p className="like-count">👍 {art.like} likes</p>
//               <div className="article-buttons">
//                 {user  ? (
//                   <>
//                     <button onClick={() => func(art._id)}>Comments</button>
//                     <button onClick={() => like_func(art._id)}>Like</button>
//                   </>
//                 ) : null}
//               </div>
//               <p className="article-author">Posted by <strong>{art.user?.name || 'Unknown'}</strong></p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {error && <p className="error-message">{error}</p>}
//     </>
//   );
// };

// export default Articles;
import React, { useEffect, useState } from "react";
import "../assets/Articles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Farmerheader from "./Farmerheader";
import Expertheader from "./Expertheader";

const Articles = () => {
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [expandedArticles, setExpandedArticles] = useState({}); // ✅ To manage read more/less state
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);

    axios.get("http://localhost:9579/viewarticle")
      .then((res) => {
        if (res.status === 200) {
          setArticle(res.data.arts);
        }
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          const messages = err.response.data.errors
            .map((e) => e.msg)
            .join(", ");
          setError(messages);
        } else if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("Failed to fetch articles. Please try again.");
        }
      });
  }, []);

  function func(articleId) {
    navigate("/comments", { state: { articleId } });
  }

  function like_func(articleId) {
    axios
      .post(`http://localhost:9579/like/${articleId}`, {
        userId: user._id,
      })
      .then(() => {
        setArticle((prevArticles) =>
          prevArticles.map((art) =>
            art._id === articleId ? { ...art, like: art.like + 1 } : art
          )
        );
      })
      .catch((err) => {
        console.error("Error while liking article:", err);
      });
  }

 function readArticle(text) {
  const preferredLang = localStorage.getItem("preferredLanguage") || "en";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = preferredLang;
  speechSynthesis.speak(utterance);
}

  function handleDoubleClick() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      console.log("Speech stopped!");
    }
  }
  // ✅ Toggle read more/less
  function toggleReadMore(articleId) {
    setExpandedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  }

  return (
    <>
      {user && user.usertype === "farmer" ? <Farmerheader /> : <Expertheader />}
      <div className="articles-wrapper">
        {article.map((art, ind) => {
          const isExpanded = expandedArticles[art._id] || false;
          const contentPreview =
            art.content.length > 250 && !isExpanded
              ? art.content.substring(0, 250) + "..."
              : art.content;

          return (
            <div key={ind} className="article-card">
              <div className="article-image">
                {art.image && (
                  <img
                    src={art.image}
                    alt="Article"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                )}
              </div>
              <div className="article-content">
                <h3 className="article-title">{art.title}</h3>

                
                <p className="article-content">{contentPreview}</p>
                {art.content.length > 250 && (
                  <button
                    className="read-more-btn"
                    onClick={() => toggleReadMore(art._id)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}

                
               <button 
  className="read-article-btn"
  onClick={() => readArticle(art.content)}
   onDoubleClick={handleDoubleClick}
>
  🔊 Read Article
</button>


      

                <p className="like-count">👍 {art.like} likes</p>
                <div className="article-buttons">
                  {user ? (
                    <>
                      <button onClick={() => func(art._id)}>Comments</button>
                      <button onClick={() => like_func(art._id)}>Like</button>
                    </>
                  ) : null}
                </div>
                <p className="article-author">
                  Posted by <strong>{art.user?.name || "Unknown"}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Articles;
