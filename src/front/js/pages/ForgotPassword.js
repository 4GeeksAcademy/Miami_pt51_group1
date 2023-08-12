import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const getQuestions = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/get-security-questions`, { email });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const verifyAnswers = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/verify-security-answers`, { email, answers });
      setToken(response.data.token);
    } catch (error) {
      console.error('Error verifying answers:', error);
      alert('Invalid answers. Please try again.');
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
      {questions.length === 0 ? (
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={getQuestions}>Get Security Questions</button>
        </div>
      ) : token === '' ? (
        <div>
          {questions.map((q, index) => (
            <div key={index}>
              <label>{q}</label>
              <input type="text" value={answers[index] || ''} onChange={(e) => setAnswers([...answers, e.target.value])} required />
            </div>
          ))}
          <button onClick={verifyAnswers}>Verify Answers</button>
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
