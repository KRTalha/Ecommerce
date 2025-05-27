import axios from "axios";
import { Header } from "../../components/Header";
import "./HomePage.css";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/products").then((response) => {
  //     setProducts(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>{" "}
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
    </>
  );
}
