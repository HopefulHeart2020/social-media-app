import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// register user
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            friends,
            occupation,
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            location,
            friends,
            occupation,
        });
        
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}