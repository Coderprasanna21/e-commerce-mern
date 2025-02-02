import express from 'express';
import authenticate from '../authentication/authenticate.js';
import updateCartItems from '../controllers/updateCartController.js';

const router  = express.Router();

router.put('/updatecart', authenticate, updateCartItems );

export default router;