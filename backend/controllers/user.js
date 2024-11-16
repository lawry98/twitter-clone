import Notify from "../models/notify.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getProfile = async (req, res) => { 
    const { username } = req.params;
    try{
        const user = await User.findOne({ username: username }).select("-password");
        if(!user){
            res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch(err){
        console.log("error in get profile", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const follow = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User .findById(req.user._id);
        const otherUser = await User.findById(id);

        if(id === req.user._id.toString()){
            res.status(400).json({ error: "You cannot follow yourself" });
        }

        if(!otherUser || !user){
            res.status(404).json({ error: "User not found" });
        }

        if(user.following.includes(id)){
            await user.updateOne({ $pull: { following: id } });
            await otherUser.updateOne({ $pull: { followers: req.user._id } });  
            res.status(200).json({ message: "Unfollowed successfully" });
        }
        else{
            await user.updateOne({ $push: { following: id } });
            await otherUser.updateOne({ $push: { followers: req.user._id } });
            const newNotification = new Notify({
                type:"follow",
                from: req.user._id,
                to: id,                
            });
            await newNotification.save();
            res.status(200).json({ message: "Followed successfully" });
        }
    }
    catch(err){
        console.log("error in follow", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const suggested = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        const suggestedUsers = await User.find({ 
            $and: [
                { _id: { $ne: req.user._id } },
                { _id: { $nin: user.following } }
            ]
        }).select("-password").limit(5);
        res.status(200).json(suggestedUsers);
    }
    catch(err){
        console.log("error in suggested", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const update = async (req, res) => {
    const { username, email, currentPassword, newPassword, bio, link } = req.body;
    let { profilePicture, coverPicture } = req.body;
    try{
        let user = await User.findById(req.user._id);
        if(!currentPassword && newPassword || currentPassword && !newPassword){
            res.status(400).json({ error: "Please provide both current and new password" });
        }
        if(currentPassword && newPassword){
            if(!user){
                return res.status(404).json({ error: "User not found" });
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(400).json({ error: "Invalid password" });
            }
            if(newPassword.length < 6){
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if(profilePicture){
            const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
                upload_preset: "social_media"
            });
            profilePicture = uploadedResponse.secure_url;
        }
        if(coverPicture){
            const uploadedResponse = await cloudinary.uploader.upload(coverPicture, {
                upload_preset: "social_media"
            });
            coverPicture = uploadedResponse.secure_url;
        }
        user.username = username? username: user.username;
        user.email = email? email: user.email;
        user.profilePicture = profilePicture? profilePicture: user.profilePicture;
        user.coverPicture = coverPicture? coverPicture: user.coverPicture;
        user.bio = bio? bio: user.bio;
        user = await user.save();

        user.password = undefined;
        return res.status(200).json(user);
    }
    catch(err){
        console.log("error in update", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}