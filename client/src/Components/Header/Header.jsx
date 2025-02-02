import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CartContext from "../../context/CartContext";

const Header = () => {
  const [user, setUser] = useState(true);
  const {cartItems}  = useContext(CartContext);
  return (
    <Fragment>
      <header >
        <div className="logo ">
        <Link to="/">
          <h2>
            <span>✓</span>Cart
          </h2>
        </Link>
        </div>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
        </nav>
        <section>
          <div className="cart position-relative">
            <Link to="/cart">
              <div className="d-flex justify-content-center align-items-center">
                <ShoppingCart className="cart-icon" />  
                {cartItems.length > 0 && (
                  <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill ">
                  {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
          </div>


          <div className="user ">
          <Link to="/user">
            {user ? (
              <div className="d-flex justify-content-center ">
                <AccountCircleIcon className="cart-icon"/>  
              </div>
            ) : (
              <button className="signin-btn">Sign In</button>
            )}
          </Link>
          </div>
        </section>
      </header>
    </Fragment>
  );
};

export default Header;
