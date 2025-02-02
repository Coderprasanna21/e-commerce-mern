import React, {  Fragment, useContext } from 'react';
import { toast } from 'react-toastify'; // Importing toast for error messages
import OrderContext from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const { shippingDetails, setShippingDetails } = useContext(OrderContext);
    const navigate = useNavigate();
  const handleNext = () => {
    // Check if all fields are filled
    if (
      !shippingDetails.email ||
      !shippingDetails.phone ||
      !shippingDetails.name ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.state ||
      !shippingDetails.zip ||
      !shippingDetails.country
    ) {
      toast.error("Please complete all fields before proceeding");
      return;
    }
    navigate("/checkout/summary");
  };

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = ()=>{
    navigate('/cart');
  }
  return (
    <Fragment>
    <div className="container mt-5">
  <h2 className="text-center mb-4 text-primary fw-bold">Shipping Address</h2>
  <div className="row">
    <div className="col-md-8 col-lg-6 mx-auto">
      <div className="card p-4 shadow-lg border-0">
        <h3 className="text-center text-dark mb-3">Shipping Information</h3>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
            value={shippingDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Phone Number"
            name="phone"
            value={shippingDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Full Name"
            name="name"
            value={shippingDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address" className="form-label fw-semibold">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="city" className="form-label fw-semibold">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="City"
            name="city"
            value={shippingDetails.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="state" className="form-label fw-semibold">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            placeholder="State"
            name="state"
            value={shippingDetails.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="zip" className="form-label fw-semibold">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            placeholder="Zip Code"
            name="zip"
            value={shippingDetails.zip}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="country" className="form-label fw-semibold">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder="Country"
            name="country"
            value={shippingDetails.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between">
          <button
            className="btn btn-outline-secondary px-4 py-2 w-md-auto mb-2 mb-md-0"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>

          <button
            className="btn btn-primary px-4 py-2 fw-bold w-md-auto mt-3 mt-md-0"
            onClick={handleNext}
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </Fragment>
  );
};

export default ShippingAddress;
