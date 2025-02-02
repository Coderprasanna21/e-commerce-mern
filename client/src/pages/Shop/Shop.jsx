import React, { useContext, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Shop.css";
import ProductContext from "../../context/ProductContext";
import { Loader } from "../../Components/loader/Loader";
import { EmptyProductClass } from "../../Components/EmptyProduct/EmptyProductClass";
const Shop = () => {
  const { loading, productList } = useContext(ProductContext);
  return (
    <Fragment>
      <div className="product-section">
        {loading ? (
          <Loader />
        ) : productList.length > 0 ? (
          <ProductCard />
        ) : (
          <EmptyProductClass />
        )}
      </div>
    </Fragment>
  );
};

export default Shop;
