const mongoose = require('mongoose');

// Create MongoDB schemas
const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }, // Username is required and must be unique
    password: { type: String, required: true }, // Password is required
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title is required
    description: { type: String, required: true }, // Description is required
    price: { type: Number, required: true }, // Price is required
    imageLink: { type: String, required: true }, // Image link is required
    published: { type: Boolean, default: false }, // Default to false
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }, // Username is required and must be unique
    password: { type: String, required: true }, // Password is required
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

// Create MongoDB models
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const User = mongoose.model('User', userSchema);

// Export the models
module.exports = { Admin, Course, User };