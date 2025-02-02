import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js"; 
import productRoutes from './routes/productRoutes.js';
import signupRoute from './routes/signupRoutes.js';
import signinRoute from './routes/signinRoutes.js'; 
import addToCartRoute from './routes/addToCartRoutes.js'
import fetchCartItemRoute from './routes/fetchCartItemRoute.js'
import updateCartRoute from './routes/updateCartRoute.js'
import removeCartRoute from './routes/removeCartItemRoute.js'
import ordersRoute from './routes/orderRoute.js'
import fetchOrderRoute from './routes/fetchOrderRoute.js'


dotenv.config();

const app = express();
connectDB();


app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/products', productRoutes);
app.use('/api/signup',signupRoute);
app.use('/api/signin',signinRoute);
app.use('/api', addToCartRoute); 
app.use('/api',fetchCartItemRoute);
app.use('/api',updateCartRoute);
app.use('/api', removeCartRoute);
app.use('/api/orders',ordersRoute);
app.use('/api/fetchorder',fetchOrderRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
