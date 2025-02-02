import User from "../models/userRegisterModel.js";

const removeCartItem = async (req, res) => {
  try {
    const {productId}  = req.body; // Correctly extract productId
    
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the cart item using $pull
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: { productId } }
    });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Error removing item" });
  }
};

export default removeCartItem;
