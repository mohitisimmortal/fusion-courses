const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authorization');
const { signupAdmin, loginAdmin, createCourse, updateCourse, getAdminCourses, deleteCourse } = require('../controllers/adminController');

// admin routes
router.route('/signup').post(signupAdmin);
router.route('/login').post(loginAdmin);
router.route('/createcourse').post(authenticateToken, createCourse);
router.route('/updatecourse/:courseId').put(authenticateToken, updateCourse);
router.route('/deletecourse/:courseId').delete(authenticateToken, deleteCourse);
router.route('/courses').get(authenticateToken, getAdminCourses);

module.exports = router;