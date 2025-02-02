import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../context/OrderContext";
import CartContext from "../../context/CartContext";

const Summary = () => {
  const navigate = useNavigate();
  const { shippingDetails, orderList } = useContext(OrderContext);
    useContext(CartContext);

  const handleBack = () => {
    navigate("/checkout/shipping");
  };

  const totalPrice = orderList.reduce((acc, product)=> {
    const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ""),10);
    return acc + priceNumber * product.quantity;
  },0) 

  return (
    <Fragment>
      <div className="container mt-4 mb-4">
  <div className="row justify-content-center">
    <div className="col-12 col-md-8">
      {/* Responsive column */}
      <div className="card p-4 shadow-lg border-0 rounded-3">
        <h3 className="text-center mb-4 text-primary fw-bold">Order Summary</h3>

        {/* Shipping Details */}
        <div className="border p-2 rounded-3 bg-light ">
          <h5 className="text-secondary text-center">Shipping Details</h5>
          <p className="mb-2">
            <strong>Name:</strong> {shippingDetails.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {shippingDetails.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {shippingDetails.phone}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {shippingDetails.address},{" "}
            {shippingDetails.city}, {shippingDetails.state} - {shippingDetails.zip}, {shippingDetails.country}
          </p>
        </div>

        {/* Product List */}
        <ul className="list-group mb-4 mt-3">
          {orderList?.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
            >
              <img
                className="img-fluid rounded shadow-sm"
                src={item.imagePath}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
              <span
                className="fw-bold text-truncate"
                style={{ maxWidth: "150px" }}
              >
                {item.name.length > 10
                  ? `${item.name.slice(0, 30)}...`
                  : item.name}
              </span>
              <span className="text-muted">Qty: {item.quantity}</span>
              <span className="fw-semibold">{`₹${ (item.price.replace("₹","").replace(",","") * item.quantity).toLocaleString()}`}</span>
            </li>
          ))}
        </ul>

        {/* Price Breakdown */}
        <table className="table table-borderless text-center">
          <tbody>
            <tr>
              <td className="fw-semibold">Final Price</td>
              <td className="text-primary fw-bold fs-5">{`₹${totalPrice.toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4 py-2 w-md-auto mb-2 mb-md-0"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <button
            className="btn btn-primary px-4 py-2 w-md-auto"
            onClick={() => navigate("/checkout/payment")}
          >
            Proceed to Payment <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </Fragment>
  );
};

export default Summary;
