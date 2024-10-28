import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './section3.css';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';

const Section3 = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    const [page, setPage] = useState(1); // Start with the first page
    const [totalCourses, setTotalCourses] = useState(0); // Total number of courses

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${userurl}/courses?page=${page}&limit=6`);
            setCourses((prevCourses) => [...prevCourses, ...response.data.courses]);
            setTotalCourses(response.data.totalCourses);
        } catch (error) {
            handleApiError(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [page]);


    const handleShowMore = () => {
        if (courses.length < totalCourses) {
            setPage((prevPage) => prevPage + 1);
        }
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
                {courses.map((course) => (
                    <div className="courses-box" key={course._id}>
                        <div>
                            <img src={course.imageLink} alt={course.title} />
                        </div>
                        <h4>{course.title}</h4>
                        <button className='viewbtn' onClick={() => handleViewDetails(course._id)}>View Details</button>
                    </div>
                ))}
            </div>

            {courses.length < totalCourses &&
                (
                    <div>
                        <button className='showmorebtn' onClick={handleShowMore}>
                            Show more...
                        </button>
                    </div>
                )
            }
        </section>
    );
};

export default Section3;