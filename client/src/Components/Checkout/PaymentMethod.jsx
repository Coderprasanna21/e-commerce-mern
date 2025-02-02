import React, { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import OrderContext from "../../context/OrderContext";


const PaymentMethod = () => {
  const navigate = useNavigate();
  const [isCOD, setIsCOD] = useState(false);
  const {placeOrder, setLoading} = useContext(OrderContext);

  const handlePlaceOrder = async () => {
    if (!isCOD) {
      toast.error("Please select a payment method.");
      return;
    }
  
    try {
      setLoading(true);
      await placeOrder(); // Call the function
      navigate("/checkout/ordersuccess");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/checkout/summary");
  };
  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center mt-4  text-primary fw-bold">
          Payment Method
        </h2>
        <div className="row mt-4 mb-4">
          <div className="col-lg-6 mx-auto">
            <div className="card p-4 shadow-lg border-0">
              <h3 className="text-center text-dark mb-3">
                Select Payment Method
              </h3>

              <div className="form-check bg-light p-3 px-5 rounded mb-2">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  checked={isCOD}
                  onChange={() => setIsCOD(true)}
                  id="cod"
                />
                <label className="form-check-label fw-semibold" htmlFor="cod">
                  Cash on Delivery (COD)
                </label>
              </div>

              <div className="form-check bg-light p-3 px-5 rounded mb-2">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  disabled
                  id="card"
                />
                <label className="form-check-label text-muted" htmlFor="card">
                  Credit/Debit Cards (Coming Soon)
                </label>
              </div>

              <div className="form-check bg-light p-3  px-5 rounded mb-2">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  disabled
                  id="wallet"
                />
                <label className="form-check-label text-muted" htmlFor="wallet">
                  Digital Wallet (Coming Soon)
                </label>
              </div>

              <div className="form-check bg-light p-3 px-5 rounded mb-2">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  disabled
                  id="netbanking"
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="netbanking"
                >
                  Netbanking (Coming Soon)
                </label>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
                <button
                  className="btn btn-outline-secondary px-4 py-2 w-md-auto mb-2 mb-md-0"
                  onClick={handleBack}
                >
                  <i className="bi bi-arrow-left"></i> Back
                </button>

                <button
                  className="btn btn-success px-4 py-2 fw-bold"
                  onClick={handlePlaceOrder}
                  disabled={!isCOD}
                >
                  <i className="bi bi-check-circle-fill me-2"></i> Place Order
                </button>
              </div>

              {isCOD && (
                <p className="text-success text-center mt-3">
                  <i className="bi bi-info-circle-fill me-2"></i> COD selected.
                  Prepare exact cash for delivery.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentMethod;
