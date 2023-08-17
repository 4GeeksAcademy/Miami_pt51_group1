import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState(''); // Changed to a single question
  const [answer, setAnswer] = useState(''); // Changed to a single answer
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const getQuestion = async () => { // Renamed to getQuestion
    const response = await axios.post(`${process.env.BACKEND_URL}/get-security-question`, { email });
    setQuestion(response.data.question); // Assuming the server returns the question as response.data.question
  };

  const verifyAnswer = async () => { // Renamed to verifyAnswer
    try {
      console.log(answer);
      const response = await axios.post(`${process.env.BACKEND_URL}/verify-security-answer`, { email, answer });
      setToken(response.data.token);
    } catch (error) {
      console.error('Error verifying answer:', error);
      alert('Invalid answer. Please try again.');
    }
  };

  const updatePassword = async () => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/update-password`, { new_password: newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Password updated successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      {question === '' ? (
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={getQuestion}>Get Security Question</button> {/* Renamed to getQuestion */}
        </div>
      ) : token === '' ? (
        <div>
          <label>{question}</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          <button onClick={verifyAnswer}>Verify Answer</button> {/* Renamed to verifyAnswer */}
        </div>
      ) : (
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button onClick={updatePassword}>Update Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;