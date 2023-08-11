const { Admin, Course } = require('../models/modelSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// admin controller
exports.signupAdmin = async (req, res) => {
    if (process.env.IS_PRODUCTION === 'true') {
        res.status(409).json({ error: 'Admin signup is not allowed in production' });
        return;
    }

    try {
        const { username, password } = req.body;

        // Check if admin with the given username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            res.status(409).json({ error: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();
        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const adminToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30d' });
        res.json({ message: 'Logged in successfully', adminToken });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createCourse = async (req, res) => {
    try {
        // Extract data from request body
        const { title, description, price, imageLink, published } = req.body;
        const course = new Course({ title, description, price, imageLink, published });
        await course.save();
        res.json({ message: 'Course created successfully', courseId: course._id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        // Extract data from request body
        const { title, description, price, imageLink, published } = req.body;
        const courseId = req.params.courseId;
        await Course.findByIdAndUpdate(courseId, { title, description, price, imageLink, published });
        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        // Delete the course
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAdminCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
