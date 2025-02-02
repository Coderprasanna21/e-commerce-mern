import User from "../models/userRegisterModel.js";
import bcrypt from 'bcrypt';

const signUp = async (req,res) =>{
    const {name, email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser)
        {
            return res.status(400).json({ message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ name, email, password: hashedPassword, cart: []});
        await newUser.save();

        res.status(201).json({ 
            message: 'User registered Successfully',
            user: {name: newUser.name, email:newUser.email, cart: newUser.cart}
        });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Server error', err});
    }
}

export default signUp;