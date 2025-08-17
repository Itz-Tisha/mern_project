import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import '../assets/navbar.css'
import '../assets/Navbar.css'
const Farmerheader = () => {
   const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [usertype, setUsertype] = useState('');
  const [islogin, setIslogin] = useState(false);
  const [isfarmer, setIsfarmer] = useState(false);
   function logout() {
    
    localStorage.removeItem('user');
    localStorage.removeItem('usertype');
    localStorage.removeItem('islogin');
    setUser('');
    setUsertype('');
    setIslogin(false);
    setIsfarmer(false);
   // navigate(0);
    navigate('/')
  }
  useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedUsertype = localStorage.getItem('usertype');
      const storedIslogin = localStorage.getItem('islogin');
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedUsertype) {
        setUsertype(storedUsertype);
        if (storedUsertype === 'farmer') {
          setIsfarmer(true);
        }
      }
      if (storedIslogin) {
        setIslogin(storedIslogin === 'true');
      }
    }, []);
  return (
    <>
     <nav className="navbar">
      <div className="logo">
        <span>AgroConnect</span> <span className="emoji">🌱</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
       
        {islogin ? (
          <>
             <Link to="/Postq">Post Doubts</Link>  
             <Link to="/articles">Expert Insights</Link>
           
             <Link to="/displayq">Responses</Link>
            <Link to="/viewweather">AgroWeather</Link>
             <Link to="/notification">Notifications</Link>
              <Link to="/trending_art">Trending Articles</Link>
            <Link to="/userprofile">Profile</Link>
            <Link to="/askai">Ask AI</Link>
      <button className="logout-btn" onClick={logout}>Logout</button>
          </>
          
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
    
     
    </>
  )
}

export default Farmerheader
