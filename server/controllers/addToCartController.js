import User from "../models/userRegisterModel.js";

const addToCart = async (req, res)=>{
    const {productId, quantity} = req.body;
    const userId = req.user.userId;
    if(!productId || !quantity )
    {
        return res.status(400).json({ message: "Product ID and valid quantity are required"});

    }

    try{
        const user = await User.findOne({_id:userId});

        if(!user){
            return res.status(404).json({ message: "user not found"});
        }

        const existingProduct = user.cart.find((item)=> item.productId.toString() === productId);

        if (!existingProduct) {
            user.cart.push({ productId, quantity });
            await user.save();
            return res.status(200).json({ message: "Product added to cart", cart: user.cart });
          } 
          else {
            return res.status(200).json({ message: "Product already exists in cart"});
          }
    }
    catch(error)
    {
        res.status(500).json({ message: "Internal server error"});
    }
}

export default addToCart;