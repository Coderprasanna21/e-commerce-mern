import React, { Fragment } from "react";

const OrderedProducts = ({ order }) => {
  const { products, paymentMethod, totalAmount } = order;

  return (
  
    <Fragment>
      <div className="d-flex flex-column border p-3 mb-3 rounded shadow-sm">
        <ul className="list-unstyled">
          {products.map((product) => (
            <li
              key={product._id}
              className="cart-item d-flex flex-column flex-md-row align-items-start border p-3 mb-3 rounded shadow-sm"
            >
              {/* Product Image */}
              <div className="item-image">
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="item-details d-flex flex-column align-items-start gap-2 ms-3">
                <h5 className="text-start">
                  {product.name.length > 40
                    ? `${product.name.slice(0, 40)}...`
                    : product.name}
                </h5>

                {/* Pricing Details */}
                <div className="amt d-flex gap-3">
                  <p className="old-price text-muted">
                    <s>{product.oldPrice}</s>
                  </p>
                  <p className="fw-bold">{product.price}</p>
                  <p className="text-success">{product.offer}</p>
                </div>

                {/* Quantity & Stock */}
                <div className="quantity-controls d-flex gap-3">
                  <span>{`Quantity: ${product.quantity}`}</span>
                  <span>{`Stock: ${product.stock}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary */}
        <div className="order-summary d-flex flex-column flex-md-row justify-content-between align-items-start border-top pt-3">
          <span className="fw-bold">Payment Method: {paymentMethod}</span>
          <span className="fw-bold">
            Total Amount: ₹{totalAmount?.toLocaleString()}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderedProducts;
