import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './section3.css';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';

const Section3 = () => {
    const [courses, setCourses] = useState([]);
    const [coursesToShow, setCoursesToShow] = useState(6); // Number of courses to display initially
    const navigate = useNavigate()

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${userurl}/courses`);
            setCourses(response.data.courses);
        } catch (error) {
            // console.log('Error fetching courses:', error);
            handleApiError(error)
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleShowMore = () => {
        // Increase the number of courses to show by 6
        setCoursesToShow((prevCoursesToShow) => prevCoursesToShow + 6);
    };

    // Function to navigate to the course details page
    const handleViewDetails = (courseId) => {
        navigate(`/coursedetail/${courseId}`);
    };

    return (
        <section className='section3' id='section3'>
            <div>
                <h3>Train yourself with real world <br />skills & knowledge</h3>
            </div>

            <div className="courses-container">
                {courses.slice(0, coursesToShow).map((course) => (
                    <div className="courses-box" key={course._id}>
                        <div>
                            <img src={course.imageLink} alt={course.title} />
                        </div>
                        <h4>{course.title}</h4>
                        <button className='viewbtn' onClick={() => handleViewDetails(course._id)}>View Details</button>
                    </div>
                ))}
            </div>

            {coursesToShow < courses.length && (
                <div>
                    <button className='showmorebtn' onClick={handleShowMore}>
                        Show more...
                    </button>
                </div>
            )}
        </section>
    );
};

export default Section3;