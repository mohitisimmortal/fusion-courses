const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware to validate token and set req.user
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization // Extract token

    if (!token) {
        res.status(401).json({ error: 'Unauthorized: Token not provided' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
        req.user = decodedToken;
        next();
    });
};

module.exports = authenticateToken;
