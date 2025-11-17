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
