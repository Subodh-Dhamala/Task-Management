import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar =()=>{

const {user,logout} = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = ()=>{
  logout();
  navigate('/login');
};

  return(
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={()=>navigate('/dashboard')}>
          <h2>Bistarai_Bistarai</h2>
        </div>


        <div className="navbar-actions">
          <span className="navbar-user">Hi! {user?.username}</span>
          <button onClick={handleLogout} className='btn-logout'>Logout</button>
        </div>
      </div>
    </nav>
  );

}
export default Navbar;