import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {
  addToCart as apiAddToCart,
  fetchCartApi,
  removeCartItemApi,
  updateCartApi,
} from "../api";
import ProductContext from "./ProductContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartMessage,setCartMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const { productList } = useContext(ProductContext);
  

  // add products to cart(db)

  const addToCart = async (productId, quantity, token) => {
    try {
      setLoading(true);
      const response = await apiAddToCart(productId, quantity, token);
        response.data.cart && setCartItems(response.data.cart); // Update cart state
        response.data.message && setCartMessage(response.data.message);
      
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data?.message || error.message
      );
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized: Please log in again");
      } else {
        // toast.error("Failed to add item to cart");
      }
    } finally {
      fetchCartItem(token);
      setLoading(false);
    }
  };

  // fetch products from cart(db)

  const fetchCartItem = async (token) => {
    try {
      setLoading(true);
      const response = await fetchCartApi(token); // Call API
      setCartItems(response.data.cart); // Set cart items
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data?.message || error.message
      );
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized: Please log in again");
      } else {
        console.log("Failed to fetch cart items");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.info("Please login now..!!");
      return;
    }

    if (token) {
      fetchCartItem(token); // Call fetch function
    } else {
      toast.error("Authentication token not found. Please log in.");
    }
  }, []);

  const matchedProducts = productList
    .filter((product) =>
      cartItems.some((cartItem) => cartItem.productId === product._id)
    )
    .map((product) => {
      const cartItem = cartItems.find(
        (cartItem) => cartItem.productId === product._id
      );
      return { ...product, quantity: cartItem.quantity };
    });

  // Calculate total price (original and discounted)
  const totalPrice = matchedProducts.reduce((acc, product) => {
    const priceString = product.oldPrice || "₹0"; // Default to ₹0 if oldPrice is undefined
    const quantity = product.quantity;
    const price = Number(priceString.replace("₹", "").replace(",", ""));
    return acc + price * quantity;
  }, 0);

  const newPrice = matchedProducts.reduce((acc, product) => {
    const priceString = product.price || "₹0"; // Default to ₹0 if price is undefined
    const quantity = product.quantity;
    const price = Number(priceString.replace("₹", "").replace(",", ""));
    return acc + price * quantity;
  }, 0);

  const discount = totalPrice - newPrice;

  // upadte cart quantity

  const updateCartQuantity = async (productId, newQuantity, token) => {
    try {
      setLoading(true);
      const response = await updateCartApi(productId, newQuantity, token);
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data?.message || error.message
      );
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized: Please log in again");
      } else {
        console.log("Failed to update cart items");
      }
    } finally {
      fetchCartItem(token);
      setLoading(false);
    }
  };

  const removeCartItem = async (productId, token) => {
    try {
      setLoading(true);
      const response = await removeCartItemApi(productId, token);

      // Correctly update the cart by removing the deleted item
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );

      toast.success("Item removed from cart");
    } catch (error) {
      console.error(
        "Error deleting cart item:",
        error.response?.data?.message || error.message
      );

      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized: Please log in again");
      } else {
        toast.error("Failed to delete cart item");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        matchedProducts, 
        totalPrice, 
        newPrice,
        discount,
        cartMessage,
        setCartMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
