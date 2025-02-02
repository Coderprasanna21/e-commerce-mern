import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShopIcon from "@mui/icons-material/Shop";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import ProductContext from "../../context/ProductContext";
import OrderContext from "../../context/OrderContext";

const ProductDetail = () => {
  const { addToCart, cartItems, cartMessage, setCartMessage } =
    useContext(CartContext);

  const { getSingleProduct, productDetail } = useContext(ProductContext);
  const { setOrderList } = useContext(OrderContext);
  const { _id } = useParams();

  // const { productDetail } = location.state || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (_id) {
      getSingleProduct(_id);
    }
  }, [_id]); // Adding dependencies for useEffect
  useEffect(() => {
    if (_id) {
      getSingleProduct(_id);
    }
  }, [_id]);

  // Add to Cart Handler
  const handleAddToCart = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to add items to the cart");
      navigate("/user");
      return;
    }

    setLoading(true);
    try {
      await addToCart(productDetail._id, quantity, token);
      if (cartMessage != "") {
        toast.success(cartMessage);
        setCartMessage("");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleBuy = (productDetail) => {
    setOrderList([{ ...productDetail, quantity: quantity }]);
    navigate("/checkout/shipping");
  };

  if (!productDetail) {
    return (
      <div className="text-center">
        <p>Product details not found. Please go back and select a product.</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="productDetail-container container">
        <div className="row g-4">
          {/* Product Image Section */}
          <div className="col-12 col-lg-6">
            <div className="product-img">
              <img
                src={productDetail.imagePath}
                className="img-fluid rounded"
                alt={productDetail.name || "Product"}
              />
            </div>
            <div className="btns mt-5 d-flex justify-content-evenly">
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={handleAddToCart}
                disabled={loading}
              >
                <ShoppingCartIcon className="me-2" />
                {loading ? "Adding..." : "Add to Cart"}
              </button>

              <button
                className="btn btn-success d-flex align-items-center"
                onClick={() => handleBuy(productDetail)}
              >
                <ShopIcon className="me-2" />
                Buy Now
              </button>

              <div className="quantity-controls d-flex gap-4 justify-content-start align-items-center">
                <button
                  
                  className="btn btn-sm btn-outline-danger"
                  disabled ={quantity <=1}
                  onClick={()=>setQuantity(quantity-1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  
                  className="btn btn-sm btn-outline-primary"
                  onClick={()=>setQuantity(quantity+1)}
                >
                  +
                </button>
                
                <span>30</span>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-12 col-lg-6">
            <p className="brand text-muted">{productDetail.brand}</p>
            <h2 className="name">{productDetail.name}</h2>
            <p className="rating text-warning">{productDetail.rating}</p>
            <p className="price fw-bold text-primary">{productDetail.price}</p>
            <div className="sub-section d-flex align-items-center">
              <p className="oldPrice text-muted me-3">
                <s>{productDetail.oldPrice}</s>
              </p>
              <p className="offer text-success">{productDetail.offer}</p>
            </div>

            {/* Product Highlights */}
            {productDetail.spec?.length > 0 && (
              <div className="spec mt-4">
                <h3 className="h5">Highlights</h3>
                <ul>
                  {productDetail.spec.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Description */}
            {productDetail.description && (
              <div className="description mt-4">
                <h3>Description</h3>
                <p>{productDetail.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetail;
