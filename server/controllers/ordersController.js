import Order from "../models/orderModel.js";
import User from "../models/userRegisterModel.js";

const placeOrder = async(req,res)=>{
    try{
        const { products, totalAmount, shippingDetails } = req.body.orderDetails;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({ message: "User not found"});
        }
    
        const newOrder =  {
            products,
            totalAmount,
            shippingDetails,
            paymentMethod:"Cash on Delivery",
            orderStatus: "Pending",
            createdAt: new Date()
        };
        
        user.order.push(newOrder)
        await user.save();
    
        res.status(201).json({ message: "Order placed successfully", order:user.order })
    }
    
    catch 
    (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
}

export default placeOrder;