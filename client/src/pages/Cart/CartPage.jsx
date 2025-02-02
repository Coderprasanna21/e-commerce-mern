import React, { Fragment, useContext } from 'react';
import CartContext from '../../context/CartContext';
import './CartPage.css';
import Cart from '../../Components/Cart/Cart';
import { Loader } from '../../Components/loader/Loader';

const CartPage = () => {
  const {  loading } = useContext(CartContext);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Cart />
      )}
    </Fragment>
  );
};

export default CartPage;
