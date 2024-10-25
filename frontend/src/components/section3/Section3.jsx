import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './section3.css';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';

const Section3 = () => {
    const [courses, setCourses] = useState([]);          // Array to store fetched courses
    const [page, setPage] = useState(1);                 // Page number for pagination
    const [hasMore, setHasMore] = useState(true);        // To track if there are more courses to load
    const [loading, setLoading] = useState(false);       // To show loading state when fetching more courses
    const navigate = useNavigate();

    // Fetch a subset of courses based on page number
    const fetchCourses = async () => {
        try {
            setLoading(true);  // Show loading indicator
            const response = await axios.get(`${userurl}/courses?page=${page}&limit=6`);  // Request a subset of 6 courses
            const newCourses = response.data.courses;

            // If there are no new courses returned, stop further fetches
            if (newCourses.length === 0) {
                setHasMore(false);  // No more courses to load
            } else {
                setCourses((prevCourses) => [...prevCourses, ...newCourses]);  // Append new courses to existing ones
            }

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);  // Hide loading indicator
        }
    };

    // Fetch courses initially and when page changes
    useEffect(() => {
        fetchCourses();
    }, [page]);

    // Handle "Show more..." button click to load next page
    const handleShowMore = () => {
        setPage((prevPage) => prevPage + 1);  // Increment page number
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

            {hasMore && !loading && (
                <div>
                    <button className='showmorebtn' onClick={handleShowMore}>
                        Show more...
                    </button>
                </div>
            )}

            {loading && <p>Loading more courses...</p>} {/* Show loading state */}
        </section>
    );
};

export default Section3;
