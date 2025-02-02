import User from "../models/userRegisterModel.js";

const fetchOrder = async(req,res)=>{

    try{
        const userId = req.user.userId;
    
        const user = await User.findById(userId);
    
        if(!user)
        {
            return res.status(404).json({ message: "User not found"});
        }
    
        res.status(200).json({message:"order details fetched successfully", order:user.order})
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }

}

export default fetchOrder;