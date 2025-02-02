import User from "../models/userRegisterModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signIn = async (req, res)=>{

    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email});
        if(!user)
        {
            return res.status(404).json({ message: 'User not Found'});
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id, userEmail: user.email, userName: user.name}, process.env.JWT_SECRET || "defaultsecretkey" );

        res.status(200).json({
            message: 'Sign in Successful',
            user: {name: user.name, email:user.email, cart: user.cart},
            token
        });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Server error', err});
    }
}

export default signIn