// ecommerce-project/src/pages/home/HomePage.jsx

import axios from "axios";
// import { Header } from "../../components/Header"; // REMOVE THIS LINE
import "./HomePage.css";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadPage }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      {/* REMOVED <title> and <link rel="icon"> from here, as App.jsx handles global metadata */}
      {/* REMOVED <Header cart={cart} /> from here */}
      <div className="home-page">
        <ProductsGrid products={products} loadPage={loadPage} cart={cart} />
      </div>
    </>
  );
}
