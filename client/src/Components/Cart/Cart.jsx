import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import "../../pages/Cart/CartPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../context/OrderContext";

const Cart = () => {
  const {
    updateCartQuantity,
    removeCartItem,
    matchedProducts,
    totalPrice,
    newPrice,
    discount,
  } = useContext(CartContext);
  const {orderList,setOrderList} = useContext(OrderContext);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleBuyNow = () => {
    setOrderList([...matchedProducts])
    navigate("/checkout/shipping");
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (!token) {
      toast.error("Please log in to update your cart");
      return;
    }
    await updateCartQuantity(productId, newQuantity, token);
  };

  const handleRemoveItem = async (productId) => {
    if (!token) {
      toast.error("Please log in to delete your cart");
      return;
    }

    await removeCartItem(productId, token);
  };

  return (
    <Fragment>
      <div className="cart-container container d-flex flex-column flex-md-row gap-3 mt-5 mb-5 fs-6">
        {matchedProducts.length > 0 ? (
          <>
            <div className="item-list container">
              <ul>
                {matchedProducts.map((product) => (
                  <li
                    key={product._id}
                    className="cart-item d-flex flex-column align-items-center flex-sm-row"
                  >
                    <div className="item-image img-fluid">
                      <img src={product.imagePath} alt={product.name} />
                    </div>
                    <div className="item-details d-flex gap-3">
                      <h2 className="text-center text-sm-start mt-3 mt-sm-0 fs-5">
                        {product.name.length > 40
                          ? `${product.name.slice(0, 40)}...`
                          : product.name}
                      </h2>
                      <div className="amt d-flex justify-content-around justify-content-sm-start gap-sm-5">
                        <p className="old-price text-muted">
                          <s>{product.oldPrice}</s>
                        </p>
                        <p>{product.price}</p>
                        <p className="text-success">{product.offer}</p>
                      </div>

                      <div className="quantity-controls d-flex gap-4 justify-content-start align-items-center">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              product._id,
                              product.quantity - 1
                            )
                          }
                          className="btn btn-sm btn-outline-danger"
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              product._id,
                              product.quantity + 1
                            )
                          }
                          className="btn btn-sm btn-outline-primary"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(product._id)}
                          className="btn btn-sm btn-danger "
                        >
                          Remove
                        </button>
                        <span>{` stock : ${product.stock}`}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="price-details container fs-6">
              <h3 className="fs-5 text-center text-sm-start">PRICE DETAILS</h3>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-center">Total Price</td>
                    <td className="text-center">{`₹${totalPrice.toLocaleString()}`}</td>
                  </tr>
                  <tr>
                    <td className="text-center">Discount</td>
                    <td className="text-center text-success">{`₹${discount.toLocaleString()}`}</td>
                  </tr>
                  <tr>
                    <td className="text-center">Final Price</td>
                    <td className="text-center text-primary">{`₹${newPrice.toLocaleString()}`}</td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={handleBuyNow}
                className="btn btn-primary w-100 mt-3"
              >
                Buy Now
              </button>
            </div>
          </>
        ) : (
          <div className="container empty-cart d-flex align-items-center justify-content-center">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
