import mongoose from 'mongoose';



const productSchema  = new mongoose.Schema({
    imagePath: String,
    name: String,
    price: String,
    oldPrice: String,
    offer: String,
    rating: String,
    spec: Array,
    stock: Number,
    description: String,
    brand: String,
}
);



const Product = mongoose.model('Product',productSchema);

export default  Product;