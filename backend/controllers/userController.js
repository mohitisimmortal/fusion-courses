const { User, Course } = require('../models/modelSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// user controller
exports.signupUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user with the given username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(409).json({ error: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const userToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30d' });
        res.json({ message: 'Logged in successfully', userToken });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserCourses = async (req, res) => {
    try {
        // Get page and limit from query parameters, with default values if not provided
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 2; // Default limit is 10 courses per page

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch the courses with pagination
        const courses = await Course.find({ published: true })
            .skip(skip) // Skip the number of documents based on page
            .limit(limit); // Limit the number of documents returned

        // Optionally, get the total count of published courses for pagination metadata
        const totalCourses = await Course.countDocuments({ published: true });

        // Send the response with courses and pagination info
        res.json({
            courses,
            currentPage: page,
            totalPages: Math.ceil(totalCourses / limit),
            totalCourses,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSingleCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.json({ course });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getPurchasedCourses = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });

        // Retrieve the purchased courses for the user
        const purchasedCourses = await Course.find({ _id: { $in: user.purchasedCourses } });
        res.json({ purchasedCourses });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addPurchasedCourse = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const user = await User.findOne({ username: req.user.username });

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }

        // Check if the user has already purchased the course
        if (user.purchasedCourses.includes(courseId)) {
            res.status(400).json({ error: 'Course already purchased' });
            return;
        }

        // Purchase the course and save it in the user's purchasedCourses array
        user.purchasedCourses.push(courseId);
        await user.save();

        res.json({ message: 'Course purchased successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



