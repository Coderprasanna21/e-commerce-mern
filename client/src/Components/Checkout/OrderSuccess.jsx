import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {

    const navigate = useNavigate();

    const handleShop = ()=>{
        navigate('/shop');
    }
  return (
<Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card p-4 shadow-lg border-0 rounded-3 text-center">
              <h2 className="text-success mb-3">Order Placed Successfully! 🎉</h2>
              <p className="lead text-muted">Thank you for your order. We'll process it shortly.</p>
              <button
                onClick={handleShop}
                className="btn btn-primary btn-lg mt-4 px-5"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
