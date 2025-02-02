import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchProducts = () => API.get("/products");

export const signUp = (userData) => API.post("/signup", userData);

export const signIn = (userData) => API.post("/signin", userData);

export const addToCart = (productId, quantity, token) => {
  return API.post(
    "/addtocart",
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the headers
      },
    }
  );
};

export const fetchCartApi = (token) => {
  return API.get("/fetchcart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartApi = (productId, quantity, token) => {
  return API.put(
    "/updatecart",
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeCartItemApi = (productId, token) => {
  return API.delete("/removecart", {
    data: { productId }, // Use "data" to specify the request body
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleProductApi = ( productId) => {
  return API.get(`/products/${productId}`, {
  });
};

export const placeOrderApi = async(orderDetails,token) =>{
    return API.post('/orders',{orderDetails},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}


export const fetchOrdersApi = async(token)=>{
  return API.get('/fetchorder',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    },
  )
}