import {useState,useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import '../styles/auth.css';

const Login =()=>{

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [error,setError] = useState('');
  const [loading,setLoading] = useState('');

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError('');

    if(!email || !password){
      setError('Please fill in all the details!');
      return;
    }

    setLoading(true);

    try{
      await login(email,password);
      navigate('/dashboard');
    }

    catch(error){
      setError(error.response?.data?.msg || 'Login Failed!');
    }

    finally{
      setLoading(false);
    }

  };

  return(
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Sign in to your account</p>
        {error && <div className = 'error-message'>{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">
              Email
            </label>
            <input type="email" className="form-input"
            placeholder='Enter your email'
            value = {email}
            onChange={(e)=>{setEmail(e.target.value)}}
            disabled={loading} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input type="password"
            className='form-input'
            placeholder='Enter your password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            disabled = {loading}
            />
          </div>

          <button
          className='btn-primary'
          type='submit'
          disabled={
            loading
          }
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? {' '}
          <Link to='/register' className='auth-Link'>
            Sign up
          </Link>
        </div>
      
      </div>
    </div>

  );
}

export default Login;