import User from "../models/userRegisterModel.js";

const updateCartItems = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { productId, quantity } = req.body;


    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }


    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }


    
    cartItem.quantity = quantity; 
    await user.save(); 

   

    
    return res.status(200).json({ message: "Cart updated successfully", cart: user.cart });

  } catch (error) {
    console.error("Error in updateCartItems:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateCartItems;
