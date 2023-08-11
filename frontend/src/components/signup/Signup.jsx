import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, // Copy the existing state
            [name]: value, // Update the specific property that changed
        }));
    };

    const handleSignup = async () => {
        try {
            await axios.post(`${userurl}/signup`, formData);
            alert('Signup successful! Please log in.');
            navigate('/login')
        } catch (error) {
            // console.log('Error signing up:', error);
            handleApiError(error)
        }
    };

    return (
        <section className='signup'>
            <h2>Signup</h2>
            <div className="signup-box">

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
                <button onClick={handleSignup}>Sign Up</button>
            </div>
        </section>
    );
}

export default Signup;