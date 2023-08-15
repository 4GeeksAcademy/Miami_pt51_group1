
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Context } from "../store/appContext";
// import './Login.css';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, actions } = useContext(Context);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate= useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/login`, {
        email,
        password
      });
      setIsLoggingIn(false);
      if (response.status == 200) {
        const token = response.data.token;
        alert(`Logged in successfully as ${email}`);
        localStorage.setItem('token', token)
        navigate('/private')

      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };
  
  return (
    <div>
      
      {/* <h2 style={{color: 'black'}}>Login</h2> */}
      <form onSubmit={handleLogin}>
        <div className="form-group">

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            disabled={isLoggingIn}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            required
          />
        </div>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        <button type="submit" disabled={isLoggingIn}>
          <RouterLink className="nav-link" to="/forgot-password">Forgot Password</RouterLink>
        </button>
      </form>
    </div>
  );
};







    

// export default Login;
export default Login;

