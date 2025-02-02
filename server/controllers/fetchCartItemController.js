import User from "../models/userRegisterModel.js";

const fetchCartItems = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Cart items fetched successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default fetchCartItems;
