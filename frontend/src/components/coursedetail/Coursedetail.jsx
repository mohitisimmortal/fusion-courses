import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './coursedetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';

function Coursedetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${userurl}/courses/${courseId}`);
      setCourse(response.data.course);
    } catch (error) {
      // console.log('Error fetching course details:', error);
      handleApiError(error)
    }
  };

  const handlePurchaseCourse = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      // User is not logged in, redirect to login page
      navigate('/login');
    } else {
      // User is logged in, navigate to the payment page
      navigate(`/payment/${courseId}`);
    }

  }

  return (
    <section className='coursedetail'>
      {course ? (
        <>
          <img src={course.imageLink} alt={course.title} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <p>Price: ${course.price}</p>
          <button className='joincoursebtn' onClick={handlePurchaseCourse}>
            Join Course
          </button>
        </>
      ) : (
        <h2 style={{ color: 'white', textAlign: 'center' }}>Course not found</h2>
      )}
    </section>
  );
}

export default Coursedetail;