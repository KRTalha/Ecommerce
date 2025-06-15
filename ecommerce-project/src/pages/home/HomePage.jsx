import axios from "axios";
import { Header } from "../../components/Header";
import "./HomePage.css";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

// Receive new props for search control, and original props
export function HomePage({
  cart,
  loadPage,
  currentSearchTerm,
  searchActionTrigger,
  isListening,
  toggleListening,
  handleManualSearch,
}) {
  const [products, setProducts] = useState([]);

  // This useEffect now depends on currentSearchTerm AND searchActionTrigger
  // This ensures that even if currentSearchTerm is the same,
  // incrementing searchActionTrigger will force a re-fetch.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = currentSearchTerm
          ? `?search=${encodeURIComponent(currentSearchTerm)}`
          : "";
        console.log("Fetching products with query:", query); // Debugging line
        const response = await axios.get(`api/products${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentSearchTerm, searchActionTrigger]); // Dependencies include searchActionTrigger

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      {/* Pass all necessary props to Header */}
      <Header
        cart={cart}
        isListening={isListening}
        toggleListening={toggleListening}
        currentSearchTerm={currentSearchTerm}
        handleManualSearch={handleManualSearch}
      />
      <div className="home-page">
        <div className="search-results-info">
          {currentSearchTerm && (
            <p>Showing results for: "{currentSearchTerm}"</p>
          )}
          {!currentSearchTerm && <p>Displaying all products.</p>}
        </div>
        <ProductsGrid products={products} loadPage={loadPage} cart={cart} />
      </div>
    </>
  );
}
