// ecommerce-project/src/pages/home/HomePage.jsx

import axios from "axios";
// import { Header } from "../../components/Header"; // REMOVE THIS LINE
import "./HomePage.css";
import { useSearchParams } from "react-router";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadPage }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    getHomeData();
  }, [search]);

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
