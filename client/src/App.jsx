import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./pages/home/Home";
import About from "./pages/About/About";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import Shop from "./pages/Shop/Shop";
import ProfilePage from "./pages/UserProfile/ProfilePage";
import CartPage from "./pages/Cart/CartPage";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderContextProvider } from "./context/OrderContext";
import ShippingAddress from "./Components/Checkout/ShippingAddress";
import Summary from "./Components/Checkout/Summary";
import PaymentMethod from "./Components/Checkout/PaymentMethod";
import OrderSuccess from "./Components/Checkout/OrderSuccess";
import Orders from "./Components/orders/Orders";
function App() {
  return (
    <>
      <UserProvider>
          <ProductProvider>
            <CartProvider>
              <OrderContextProvider>
              <BrowserRouter>
                <Header />
                <main className="container-fluid">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route
                      path="/productDetailPage/:_id"
                      element={<ProductDetailPage />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/user" element={<ProfilePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<Orders />}/>
                    <Route path="/checkout/shipping" element={<ShippingAddress />}/>
                    <Route path="/checkout/summary" element={<Summary />}/>
                    <Route path="/checkout/payment" element={<PaymentMethod />}/>
                    <Route path="/checkout/ordersuccess" element={<OrderSuccess />}/>
                  </Routes>
                </main>
                <Footer />
              </BrowserRouter>
              </OrderContextProvider>
            </CartProvider>
          </ProductProvider>
      </UserProvider>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "350px", fontSize: "1rem" }}
      />
    </>
  );
}

export default App;
