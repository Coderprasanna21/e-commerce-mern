import React, { Fragment, useContext } from "react";
import OrderContext from "../../context/OrderContext";
import OrderedProducts from "./OrderedProducts";

const Orders = () => {
  const { fecthedOrder } = useContext(OrderContext);
  return (
    <Fragment>
      <div className="cart-container container d-flex flex-column align-items-center  gap-2 mt-5 mb-5 fs-6">
        {fecthedOrder.length > 0 ? (
          <>
            <h3 className="my-4 fw-bold">Ordered Products</h3>

            <div className="p-4  container">
              <ul className="d-flex flex-column gap-5">
                {fecthedOrder.map((order) => (
                  <OrderedProducts order={order} />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="container empty-cart d-flex align-items-center justify-content-center">
            <p>No orders here</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Orders;
