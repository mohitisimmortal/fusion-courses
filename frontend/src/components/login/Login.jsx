import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useRecoilState } from 'recoil';
import { userIsLoggedInState } from '../../recoil/userAtoms';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(userIsLoggedInState);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${userurl}/login`, formData);

      if (response.data.userToken) {
        localStorage.setItem('userToken', response.data.userToken);
      }

      if (response.data.userToken) {
        alert('Login successful!');
        setUserIsLoggedIn(true); // Update the isLoggedIn state in the Homepage component
        navigate('/')
      }
    } catch (error) {
      // console.log('Error logging in:', error);
      handleApiError(error)
    }
  };

  return (
    <section className='login'>
      <h2>User Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
    </section>
  );
}

export default Login;