import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/Login.css' 

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function log(e) {
        e.preventDefault();
        const form = { email, password };
        axios.post('http://localhost:9579/login', form).then((res) => {
            if (res.data.status === 'ok') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('usertype', res.data.usertype);
                localStorage.setItem('islogin', res.data.islogin);
                navigate('/');
            } else {
                alert('Invalid credentials');
            }
        }).catch(err => {
            if (err.response?.data?.errors) {
                const messages = err.response.data.errors.map(e => e.msg).join(', ');
                setError(messages);
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Signup failed. Please try again.");
            }
        });
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={log}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                

                <p>Don't have an account? <Link to='/sign'>Sign Up</Link></p>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}

export default Login


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../assets/Login.css';

// const Login = () => {
//     const [email, setemail] = useState('');
//     const [password, setpassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     const recognizeSpeech = async (fieldSetter) => {
//         if (!SpeechRecognition) {
//             alert("Speech Recognition not supported in this browser.");
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.lang = 'gu-IN'; // Gujarati language
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 1;

//         recognition.onresult = async (event) => {
//             const gujaratiText = event.results[0][0].transcript;
//             console.log("Gujarati speech:", gujaratiText);

//             try {
//                 const translatedText = await translateGujaratiToEnglish(gujaratiText);
//                 console.log("Translated to English:", translatedText);
//                 fieldSetter(translatedText);
//             } catch (error) {
//                 console.error("Translation failed:", error);
//                 fieldSetter(gujaratiText); // fallback to Gujarati
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error("Speech recognition error:", event.error);
//         };

//         recognition.start();
//     };

//     const translateGujaratiToEnglish = async (text) => {
//         const response = await fetch("https://translation.googleapis.com/language/translate/v2", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 q: text,
//                 source: "gu",
//                 target: "en",
//                 format: "text",
//                 key: "YOUR_GOOGLE_TRANSLATE_API_KEY" // ← replace this
//             })
//         });

//         const data = await response.json();
//         return data.data.translations[0].translatedText;
//     };

//     const log = (e) => {
//         e.preventDefault();
//         const form = { email, password };

//         axios.post('http://localhost:9579/login', form)
//             .then((res) => {
//                 if (res.data.status === 'ok') {
//                     localStorage.setItem('user', JSON.stringify(res.data.user));
//                     localStorage.setItem('usertype', res.data.usertype);
//                     localStorage.setItem('islogin', res.data.islogin);
//                     navigate('/');
//                 } else {
//                     alert('Invalid credentials');
//                 }
//             })
//             .catch(err => {
//                 if (err.response?.data?.errors) {
//                     const messages = err.response.data.errors.map(e => e.msg).join(', ');
//                     setError(messages);
//                 } else if (err.response?.data?.error) {
//                     setError(err.response.data.error);
//                 } else {
//                     setError("Login failed. Please try again.");
//                 }
//             });
//     };

//     return (
//         <div className="login-container">
//             <form className="login-form" onSubmit={log}>
//                 <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

//                 <div className="input-with-mic">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setemail(e.target.value)}
//                         placeholder="Email"
//                         required
//                     />
//                     <button type="button" onClick={() => recognizeSpeech(setemail)}>🎤</button>
//                 </div>

//                 <div className="input-with-mic">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setpassword(e.target.value)}
//                         placeholder="Password"
//                         required
//                     />
//                     <button type="button" onClick={() => recognizeSpeech(setpassword)}>🎤</button>
//                 </div>

//                 <button type="submit">Login</button>

//                 <button 
//                     type="button"
//                     onClick={() => window.location.href = "http://localhost:9579/auth/google"}
//                 >
//                     Login with Google
//                 </button>

//                 <p>Don't have an account? <Link to='/sign'>Sign Up</Link></p>
//                 {error && <p className="error-message">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../assets/Login.css';

// const Login = () => {
//     const [email, setemail] = useState('');
//     const [password, setpassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     const recognizeSpeech = async (fieldSetter) => {
//         if (!SpeechRecognition) {
//             alert("Speech Recognition not supported in this browser.");
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.lang = 'gu-IN'; // Gujarati language
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 1;

//         recognition.onresult = async (event) => {
//             const gujaratiText = event.results[0][0].transcript;
//             console.log("Gujarati speech:", gujaratiText);

//             try {
//                 const translatedText = await translateGujaratiToEnglish(gujaratiText);
//                 console.log("Translated to English:", translatedText);
//                 fieldSetter(translatedText);
//             } catch (error) {
//                 console.error("Translation failed:", error);
//                 fieldSetter(gujaratiText); // fallback to Gujarati
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error("Speech recognition error:", event.error);
//         };

//         recognition.start();
//     };

//     const translateGujaratiToEnglish = async (text) => {
//         const response = await fetch("https://translation.googleapis.com/language/translate/v2", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 q: text,
//                 source: "gu",
//                 target: "en",
//                 format: "text",
//                 key: "YOUR_GOOGLE_TRANSLATE_API_KEY" // ← replace this
//             })
//         });

//         const data = await response.json();
//         return data.data.translations[0].translatedText;
//     };

//     const log = (e) => {
//         e.preventDefault();
//         const form = { email, password };

//         axios.post('http://localhost:9579/login', form)
//             .then((res) => {
//                 if (res.data.status === 'ok') {
//                     localStorage.setItem('user', JSON.stringify(res.data.user));
//                     localStorage.setItem('usertype', res.data.usertype);
//                     localStorage.setItem('islogin', res.data.islogin);
//                     navigate('/');
//                 } else {
//                     alert('Invalid credentials');
//                 }
//             })
//             .catch(err => {
//                 if (err.response?.data?.errors) {
//                     const messages = err.response.data.errors.map(e => e.msg).join(', ');
//                     setError(messages);
//                 } else if (err.response?.data?.error) {
//                     setError(err.response.data.error);
//                 } else {
//                     setError("Login failed. Please try again.");
//                 }
//             });
//     };

//     return (
//         <div className="login-container">
//             <form className="login-form" onSubmit={log}>
//                 <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

//                 <div className="input-with-mic">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setemail(e.target.value)}
//                         placeholder="Email"
//                         required
//                     />
//                     <button type="button" onClick={() => recognizeSpeech(setemail)}>🎤</button>
//                 </div>

//                 <div className="input-with-mic">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setpassword(e.target.value)}
//                         placeholder="Password"
//                         required
//                     />
//                     <button type="button" onClick={() => recognizeSpeech(setpassword)}>🎤</button>
//                 </div>

//                 <button type="submit">Login</button>

//                 <button 
//                     type="button"
//                     onClick={() => window.location.href = "http://localhost:9579/auth/google"}
//                 >
//                     Login with Google
//                 </button>

//                 <p>Don't have an account? <Link to='/sign'>Sign Up</Link></p>
//                 {error && <p className="error-message">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Login;
