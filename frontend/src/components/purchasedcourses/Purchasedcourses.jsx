import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './purchasedcourses.css'
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';

function Purchasedcourses() {
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    useEffect(() => {
        fetchPurchasedCourses();
    }, []);

    const fetchPurchasedCourses = async () => {
        try {
            const token = localStorage.getItem('userToken'); // Get the user token from localStorage
            if (!token) {
                // If token not found, the user is not logged in
                alert('Please log in to view purchased courses.');
                return;
            }

            const response = await axios.get(`${userurl}/purchasedCourses`, {
                headers: {
                    Authorization: token
                },
            });

            setPurchasedCourses(response.data.purchasedCourses);
        } catch (error) {
            // console.log('Error fetching purchased courses:', error);
            handleApiError(error)
        }
    };

    return (
        <section className='purchased-courses'>
            {purchasedCourses.length > 0 ? (
                <>
                    <h2>Your Purchased Courses</h2>
                    <div className='course-list'>
                        {purchasedCourses.map((course) => (
                            <div key={course._id} className='course-item'>
                                <img src={course.imageLink} alt={course.title} />
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p style={{ textAlign: 'center' }}>No purchased courses found.</p>
            )}
        </section>
    );
}

export default Purchasedcourses;