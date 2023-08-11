import React, { useState } from 'react';
import axios from 'axios';
import './adminlogin.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { adminIsLoggedInState } from '../../recoil/adminAtoms';
import adminurl from '../../adminurl';

function Adminlogin() {
    const [adminIsLoggedIn, setAdminIsLoggedIn] = useRecoilState(adminIsLoggedInState);

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
            const response = await axios.post(`${adminurl}/login`, formData);

            // Set the admin token in localStorage
            if (response.data.adminToken) {
                localStorage.setItem('adminToken', response.data.adminToken);
            }

            if (response.data.adminToken) {
                alert('Login successful!');
                setAdminIsLoggedIn(true); // Update the adminIsLoggedIn state in Recoil
                navigate('/admindashboard')
            }
            else {
                console.log('Login failed: Invalid credentials');
            }
        } catch (error) {
            console.log('Error logging in:', error);
        }
    };

    return (
        <section className='login adminlogin'>
            <h2 onClick={() => { navigate('/admindashboard') }}>Admin Dashboard</h2>

            <h3>Admin Login</h3>
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

export default Adminlogin;