import express from 'express';
import authenticate from '../authentication/authenticate.js';
import removeCartItem from '../controllers/removeCartController.js';

const router = express.Router();

router.delete('/removecart', authenticate, removeCartItem);

export default router;