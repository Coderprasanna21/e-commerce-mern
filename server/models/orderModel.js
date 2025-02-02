import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shippingDetails:{
            type: Object,
            required: true,
        },
        products:{
            type: Array,
            required: true,
        },
        totalAmount:{
            type:Number,
            required: true,
        },
        paymentMethod: {
            type:String,
            default:'Cash on Delivery',
            required: true,
        },
        status:{
            type:String,
            enum:['Pending','Shipped','Delivered','Cancelled'],
            default: 'Pending'
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        },
       
    { timestamps: true }
);


const Order = mongoose.model('Order',orderSchema);

export default Order;