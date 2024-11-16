import { z } from "zod";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils/token.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, name} = req.body;
        const userVal = z.object({
            username: z.string().min(3).max(30),
            email: z.string().email(),
            password: z.string().min(6),
            name: z.string().min(3).max(30),
        });
        try {
            userVal.parse(req.body);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.errors[0].message });
        }
        const oldUser = await User.findOne({username});
        if (oldUser) {
            return res.status(409).json({ message: 'Username taken!' });
        } 
        const usedEmail = await User.findOne({email});
        if (usedEmail) {
            return res.status(409).json({ message: 'Already a user present with this email!' });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
        });
        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name,
                followers: newUser.followers,
                following: newUser.following,
                profilePicture: newUser.profilePicture,
                coverPicture: newUser.coverPicture, 
                message: 'User created successfully!' 
            });
        } else {
            return res.status(500).json({ message: 'Something went wrong!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
        console.log('Error in signup route', error);
    }
};

export const signin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const userVal = z.object({
            username: z.string().min(3).max(30),
            password: z.string().min(6),
        });
        try {
            userVal.parse(req.body);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.errors[0].message });
        }
        const user = await User.findOne({username});
        const validPassword = await bcrypt.compare(password, user?.password|| '');
        if (!validPassword || !user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            followers: user.followers,
            following: user.following,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            message: 'User logged in successfully!'});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
        console.log('Error in signin route', error);
    }
};

export const signout = (req, res) => {
   try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'User logged out successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
        console.log('Error in signout route', error);
    }
};

export const authenticate = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
        console.log('Error in authenticate middleware', error);
    }
};

