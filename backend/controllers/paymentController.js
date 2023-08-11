const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User, Course } = require('../models/modelSchema');

exports.processPayment = async (req, res) => {
    try {
        const courseId = req.params.courseId;
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
        const coursePrice = course.price;

        const myPayment = await stripe.paymentIntents.create({
            amount: coursePrice * 100,
            currency: "inr",
            metadata: {
                company: "fusionCourses",
                courseId: courseId,
                userId: user._id,
            },
        });

        res.status(200).json({ client_secret: myPayment.client_secret });

    } catch (error) {
        console.log('Error processing payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

exports.sendStripeApiKey = async (req, res) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};
