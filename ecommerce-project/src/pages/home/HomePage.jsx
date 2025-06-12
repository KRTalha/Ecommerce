import axios from "axios";
import { Header } from "../../components/Header";
import "./HomePage.css";

import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadPage, voiceCommand, setVoiceCommand }) {
  // Receive voiceCommand and setVoiceCommand
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = searchTerm ? `?search=${searchTerm}` : "";
        const response = await axios.get(`api/products${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchTerm]); // Re-fetch products when searchTerm changes

  // Effect to handle voice commands
  useEffect(() => {
    if (voiceCommand) {
      // Example: "search for basketball"
      if (voiceCommand.startsWith("search for ")) {
        const query = voiceCommand.replace("search for ", "").trim();
        setSearchTerm(query); // Set the search term based on voice command
      } else if (voiceCommand.includes("show all products")) {
        setSearchTerm(""); // Clear search to show all products
      }
      // Clear the voice command after it's processed
      setVoiceCommand(null);
    }
  }, [voiceCommand, setVoiceCommand]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header cart={cart} onVoiceCommand={setVoiceCommand} />{" "}
      {/* Pass setVoiceCommand to Header */}
      <div className="home-page">
        <div className="search-results-info">
          {searchTerm && <p>Showing results for: "{searchTerm}"</p>}
        </div>
        <ProductsGrid products={products} loadPage={loadPage} cart={cart} />
      </div>
    </>
  );
}
