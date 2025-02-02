import express from 'express';
import signUp from '../controllers/signupController.js';

const router = express.Router();

router.post('/', signUp);


export default router;