import addToCart from "../controllers/addToCartController.js";
import express from 'express';
import authenticate from "../authentication/authenticate.js";

const router = express.Router();

router.post('/addtocart', authenticate, addToCart);

export default router;