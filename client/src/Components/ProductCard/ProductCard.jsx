import React, { Fragment, useContext } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ProductContext from "../../context/ProductContext";

const ProductCard = () => {
  const { productList } = useContext(ProductContext);

  return (
    <Fragment>
      <div className="container my-4">
        <div className="row g-4">
          {productList.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link
                to={`/productDetailPage/${product._id}`}
                state={{ productDetail: product }}
                className="text-decoration-none"
              >
                <div className="product card h-100">
                  {/* Product Image */}
                  {product.imagePath && (
                    <img
                      src={product.imagePath}
                      className="img-fluid card-img-top mt-4"
                      alt={product.name}
                    />
                  )}

                  {/* Product Details */}
                  <div className="card-body">
                    <h5 className="name text-truncate">
                      {product.name.length > 30
                        ? `${product.name.slice(0, 30)}...`
                        : product.name}
                    </h5>
                    <p className="rating  mb-2">
                      {product.rating || "N/A"}
                    </p>
                    <div className="card-text">
                      <p className="price fw-bold text-primary">{product.price}</p>
                      {product.oldPrice && (
                        <s className="oldPrice text-muted">{product.oldPrice}</s>
                      )}
                      {product.offer && (
                        <p className="offer text-success">{product.offer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
