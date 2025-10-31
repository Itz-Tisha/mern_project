import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../assets/Sign.css' // 👈 Import the CSS file
import { Link } from 'react-router-dom'
const Sign = () => {
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, setError] = useState('')
  const [usertype, setusertype] = useState('')

  function submitted(e) {
    e.preventDefault()
    const form = { name, email, password, usertype }
    axios.post('http://localhost:9579/sign', form)
      .then(res => {
        setError('')
        navigate('/login')
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join(', ')
          setError(messages)
        } else if (err.response?.data?.error) {
          setError(err.response.data.error)
        } else {
          setError("Signup failed. Please try again.")
        }
      })
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submitted}>
        <h2>Create Account</h2>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Username"
          value={name}
          required
        />
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          value={email}
          required
        />
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          value={password}
          required
        />
        <select
          id="usertype"
          name="usertype"
          value={usertype}
          onChange={(e) => setusertype(e.target.value)}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option> 
        </select>

        <button type="submit">Sign Up</button>
       
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Sign
