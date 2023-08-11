import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminsignup.css';
import adminurl from '../../adminurl';

function Adminsignup() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, // Copy the existing state
            [name]: value, // Update the specific property that changed
        }));
    };

    const handleSignup = async () => {
        try {
            await axios.post(`${adminurl}/signup`, formData);
            alert('Signup successful! Please log in.');
            navigate('/adminlogin')
        } catch (error) {
            console.log('Error signing up:', error);
        }
    };

    return (
        <section className='signup adminsignup'>
            <h2 onClick={() => { navigate('/admindashboard') }}>Admin Dashboard</h2>
            <h3>Admin Signup</h3>

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
        </section>
    );
}

export default Adminsignup;