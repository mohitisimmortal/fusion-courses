const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authorization');
const { signupUser, loginUser, getUserCourses, getPurchasedCourses, getSingleCourse, addPurchasedCourse } = require('../controllers/userController');

// user routes
router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/courses').get(getUserCourses)
router.route('/courses/:courseId').get(getSingleCourse)
router.route('/add-purchased-course').post(authenticateToken, addPurchasedCourse)
router.route('/purchasedCourses').get(authenticateToken, getPurchasedCourses)

module.exports = router;