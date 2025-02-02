import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: { 
        type: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 } 
            }
        ], 
        default: [] 
    },
    order:{
        type:Array,
    }

    
}, { timestamps: true });

const User = mongoose.model('User', userRegisterSchema);

export default User;
