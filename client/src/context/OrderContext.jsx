import React, { useState, createContext, useContext, useEffect } from "react";
import CartContext from "./CartContext";
import { fetchOrdersApi, placeOrderApi } from "../api";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [orderList, setOrderList] = useState([]);
  const [fecthedOrder, setFetchedOrder] = useState([]);

  const totalPrice = orderList.reduce((acc, product) => {
    const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    return acc + priceNumber * product.quantity;
  }, 0);

  const orderDetails = {
    products: orderList,
    totalAmount: totalPrice,
    shippingDetails,
  };

  const token = localStorage.getItem("authToken");

  const placeOrder = async () => {
    try {
      setLoading(true);
      const response = await placeOrderApi(orderDetails, token);

      toast.success(
        "Order placed successfully! Cash will be collected on delivery."
      );
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
      fetchOrders(token);
    }
  };

  const fetchOrders = async (token) => {
    try {
      setLoading(true);
      const response = await fetchOrdersApi(token);
      setFetchedOrder(response.data.order);
    } catch (error) {
      console.log("Error to fetch orders");
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("auhtToken");

    if (!token) {
      toast.info("Please login now..!!");
      return;
    }

    if (token) {
      fetchOrders(token);
    } else {
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        shippingDetails,
        setShippingDetails,
        placeOrder,
        loading,
        setLoading,
        orderList,
        setOrderList,
        fecthedOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
