const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const authUser = async (req, res, next) => {
    try {

        // Get token automatically from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Check blacklist
        const isBlacklisted = await blacklistModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Token is blacklisted"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information
        req.user = decoded;

        next();

    } catch (error) {

        console.log(error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = { authUser };