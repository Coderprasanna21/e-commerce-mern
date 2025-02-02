import express from 'express';
import authenticate from '../authentication/authenticate.js';
import fetchOrder from '../controllers/fetchOrderController.js';

const router = express.Router();

router.get('/',authenticate, fetchOrder);

export default router;