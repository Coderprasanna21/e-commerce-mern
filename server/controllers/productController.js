import Product from "../models/productsModel.js";

export const getProducts = async (req,res) =>{
    try{
        const products = await Product.find({});

        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message : 'Error fetching Prodcuts'});
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "ProductId required" });
        }


        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({product:product});

    } catch (error) {
        console.error("Error fetching product details:", error.message);
        res.status(500).json({ message: "Error fetching Product details" });
    }
};
