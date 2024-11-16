import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authmiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        console.log('Token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        console.log('Decoded:', decoded);
        const user = await User.findById(decoded.userID).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        console.log('User:', user);
        req.user = user; 
        next();
    } catch (error) {
        console.error('Error in authenticate middleware', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};