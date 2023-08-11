import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admindashboard.css'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { adminIsLoggedInState } from '../../recoil/adminAtoms';
import adminurl from '../../adminurl';

function Admindashboard() {
    const [courses, setCourses] = useState([]);
    const [adminIsLoggedIn, setAdminIsLoggedIn] = useRecoilState(adminIsLoggedInState);
    const navigate = useNavigate();
    const isProduction = process.env.IS_PRODUCTION;

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        imageLink: '',
        published: false,
    });

    // State to track whether we are in update mode
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateCourseId, setUpdateCourseId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            setAdminIsLoggedIn(true);
        } else {
            setAdminIsLoggedIn(false);
        }
    }, [adminIsLoggedIn]);

    useEffect(() => {
        if (adminIsLoggedIn) {
            fetchCourses();
        }
    }, [adminIsLoggedIn]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${adminurl}/courses`, {
                headers: { Authorization: `${localStorage.getItem('adminToken')}` },
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateCourse = async () => {
        try {
            await axios.post(`${adminurl}/createcourse`, courseData, {
                headers: { Authorization: `${localStorage.getItem('adminToken')}` },
            });
            alert("Course successfully created");
            fetchCourses();
        } catch (error) {
            console.log('Error creating course:', error);
        }
    };

    const handleUpdateCourse = async () => {
        try {
            await axios.put(
                `${adminurl}/updatecourse/${updateCourseId}`,
                courseData,
                {
                    headers: { Authorization: `${localStorage.getItem('adminToken')}` },
                }
            );
            alert('Course updated successfully');
            setIsUpdateMode(false);
            setUpdateCourseId(null);
            setCourseData({
                title: '',
                description: '',
                price: '',
                imageLink: '',
                published: false,
            });
            fetchCourses();
        } catch (error) {
            console.log('Error updating course:', error);
        }
    };

    const handleEditCourse = (course) => {
        setIsUpdateMode(true);
        setUpdateCourseId(course._id);
        setCourseData({
            title: course.title,
            description: course.description,
            price: course.price,
            imageLink: course.imageLink,
            published: course.published,
        });
    };

    const handleCancelUpdate = () => {
        setIsUpdateMode(false);
        setUpdateCourseId(null);
        setCourseData({
            title: '',
            description: '',
            price: '',
            imageLink: '',
            published: false,
        });
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`${adminurl}/deletecourse/${courseId}`, {
                headers: { Authorization: `${localStorage.getItem('adminToken')}` },
            });
            alert("Course successfully deleted");
            fetchCourses();
        } catch (error) {
            console.log('Error deleting course:', error);
        }
    };

    return (
        <section className='admindashboard'>
            <h2 onClick={() => { navigate('/admindashboard') }}>Admin Dashboard</h2>

            {adminIsLoggedIn ? (
                <>
                    <div>
                        <h3>{isUpdateMode ? 'Update Course' : 'Create New Course'}</h3>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={courseData.title}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="imageLink">Image Link:</label>
                        <input
                            type="text"
                            name="imageLink"
                            value={courseData.imageLink}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="published" className='published'>Published:</label>
                        <input
                            type="checkbox"
                            name="published"
                            className='published'
                            checked={courseData.published}
                            onChange={() =>
                                setCourseData((prevData) => ({
                                    ...prevData,
                                    published: !prevData.published,
                                }))
                            }
                        />
                        {isUpdateMode ? (
                            <>
                                <button onClick={handleUpdateCourse}>Update Course</button>
                                <button onClick={handleCancelUpdate}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleCreateCourse}>Create Course</button>
                        )}
                    </div>

                    <div>
                        <h3>All Courses</h3>
                        <div className="courses-container">
                            {courses.map((course) => (
                                <div className="courses-box" key={course._id}>
                                    <h4>{course.title}</h4>
                                    <p>{course.description}</p>
                                    <p>Price: ${course.price}</p>
                                    <img src={course.imageLink} alt={course.title} />
                                    <p>{course.published ? 'Published' : 'Not Published'}</p>
                                    <button onClick={() => handleEditCourse(course)}>Edit Course</button>
                                    <button onClick={() => handleDeleteCourse(course._id)}>Delete Course</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {!isProduction && (
                        <h2><button onClick={() => { navigate('/adminsignup') }}>Admin Signup</button></h2>
                    )}
                    <h2><button onClick={() => { navigate('/adminlogin') }}>Admin Login</button></h2>
                </>
            )}
        </section>
    );
}

export default Admindashboard;