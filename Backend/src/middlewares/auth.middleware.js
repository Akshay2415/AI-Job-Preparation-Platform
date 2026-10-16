const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const authUser = async (req, res, next) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const isBlacklisted = await blacklistModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Token is blacklisted"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = { authUser };