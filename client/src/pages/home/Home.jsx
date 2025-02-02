import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../../assets/img1.jpg";
import poster1 from "../../assets/poster1.webp";
import poster2 from "../../assets/poster2.webp";
import poster3 from "../../assets/poster3.webp";
import poster4 from "../../assets/poster4.webp";
import Mobile from "../../assets/Mobiles.png";
import Fashion from "../../assets/fashion.png";
import Electronics from "../../assets/Electronics.png";
import Furnitures from "../../assets/Furnitures.png";
import { Fragment, useContext, useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductContext from "../../context/ProductContext";
import { Loader } from "../../Components/loader/Loader";
import { EmptyProductClass } from "../../Components/EmptyProduct/EmptyProductClass";

const Home = () => {
  const { loading, productList } = useContext(ProductContext);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Image slider array
  const images = [banner, banner];

  return (
    <Fragment>
      {/* Product Types Section */}
      <section>
        <div className="products-types container mt-4">
          <div className="row d-flex justify-content-evenly">
            <div className="products col-6 col-md-3">
              <img src={Electronics} className="img-fluid" alt="Electronics" />
              <p>Electronics</p>
            </div>
            <div className="products col-6 col-md-3">
              <img src={Fashion} className="img-fluid" alt="Fashion" />
              <p>Fashion</p>
            </div>
            <div className="products col-6 col-md-3">
              <img src={Furnitures} className="img-fluid" alt="Furnitures" />
              <p>Home & Furnitures</p>
            </div>
            <div className="products col-6 col-md-3">
              <img src={Mobile} className="img-fluid" alt="Mobiles" />
              <p>Mobiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section>
      <div className="slider-container">
  <div className="slider">
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img className="img-fluid rounded" src={img} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  </div>
</div>

      </section>

      {/* Offers Section */}
      <section>
        <div className="offers-container container">
          <div className="offer">
            <img src={poster1} className="img-fluid rounded" alt="Offer 1" />
          </div>
          <div className="offer">
            <img src={poster2} className="img-fluid rounded" alt="Offer 2" />
          </div>
          <div className="offer">
            <img src={poster3} className="img-fluid rounded" alt="Offer 3" />
          </div>
          <div className="offer">
            <img src={poster4} className="img-fluid rounded" alt="Offer 4" />
          </div>
        </div>
      </section>

      {/* Product Display */}
      <section>
        {loading ? (
          <Loader />
        ) : productList.length > 0 ? (
          <ProductCard />
        ) : (
          <EmptyProductClass />
        )}
      </section>
    </Fragment>
  );
};

export default Home;
