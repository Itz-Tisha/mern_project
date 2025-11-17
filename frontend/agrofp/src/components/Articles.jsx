
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
  const [expandedArticles, setExpandedArticles] = useState({}); 
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
