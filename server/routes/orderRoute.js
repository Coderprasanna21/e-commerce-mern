import express from 'express';
import placeOrder from '../controllers/ordersController.js';
import authenticate from '../authentication/authenticate.js';


const router = express.Router();

router.post('/',authenticate,placeOrder);

export default router;