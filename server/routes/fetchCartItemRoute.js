import express from'express';
import authenticate from '../authentication/authenticate.js';
import fetchCartItems from '../controllers/fetchCartItemController.js';

const router  = express.Router();

router.get('/fetchcart', authenticate, fetchCartItems);

export default router;