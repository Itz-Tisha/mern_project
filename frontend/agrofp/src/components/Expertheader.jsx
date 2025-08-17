
import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../assets/Navbar.css'
const Expertheader = () => {
 
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
      navigate('/');
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
                   <Link to="/displayq">Responses</Link>
                  <Link to="/postart"> Publish Wisdom</Link>
                  <Link to="/articles">Expert Insights</Link>
                 
                  <Link to="/trending_art">Trending Articles</Link>
                  <Link to="/userprofile">Profile</Link>
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

export default Expertheader


