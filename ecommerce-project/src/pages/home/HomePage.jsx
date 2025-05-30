import axios from "axios";
import { Header } from "../../components/Header";
import "./HomePage.css";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadPage }) {
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
        <ProductsGrid products={products} loadPage={loadPage} cart={cart} />
      </div>
    </>
  );
}
