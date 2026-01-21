import {createContext, useState, useEffect} from 'react';
import api from '../utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if(token && userData){
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  },[] );

const register = async (username, email, password) => {
  try {
    const res = await api.post('/auth/register', {
      username,
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);

    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    }

    return res.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error;
  }
};


const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });

    localStorage.setItem('token', res.data.token);

    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    }

    return res.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

const logout = ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
}



return(
  <AuthContext.Provider value ={{user,loading,register,login,logout}}>
    {children}
  </AuthContext.Provider>
);

};