// ecommerce-project/src/App.jsx

import { OrderPage } from "./pages/order/OrderPage";
import { HomePage } from "./pages/home/HomePage";
import { Checkout } from "./pages/checkout/CheckoutPage";
import { TrackingPage } from "./pages/order/TrackingPage";
import { Header } from "./components/Header";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript, // Destructure clearTranscript from the hook
    error: speechError,
  } = useSpeechRecognition();

  const loadCart = useCallback(async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, []);

  useEffect(() => {
    loadCart();
    loadProducts();
  }, [loadCart, loadProducts]);

  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      console.log("Voice command received:", lowerTranscript);

      let commandHandled = false; // Flag to track if a command was handled

      // --- Navigation Commands ---
      if (
        lowerTranscript.includes("go to home page") ||
        lowerTranscript.includes("go home") ||
        lowerTranscript.includes(" home") ||
        lowerTranscript.includes("go to home") ||
        lowerTranscript.includes("home page")
      ) {
        console.log("Navigating to home page.");
        navigate("/");
        commandHandled = true;
      } else if (
        lowerTranscript.includes("go to checkout page") ||
        lowerTranscript.includes("go to cart") ||
        lowerTranscript.includes("go to court")
      ) {
        console.log("Navigating to checkout page.");
        navigate("/checkout");
        commandHandled = true;
      } else if (
        lowerTranscript.includes("go to orders page") ||
        lowerTranscript.includes("view my orders")
      ) {
        console.log("Navigating to orders page.");
        navigate("/orders");
        commandHandled = true;
      }
      // --- Add Product Command ---
      else if (
        lowerTranscript.includes("add") &&
        lowerTranscript.includes("to cart")
      ) {
        const productNameMatch = lowerTranscript.match(/add (.*) to cart/);
        if (productNameMatch && productNameMatch[1]) {
          const spokenProductName = productNameMatch[1].trim();
          console.log("Attempting to add product:", spokenProductName);

          const foundProduct = products.find(
            (p) =>
              p.name.toLowerCase().includes(spokenProductName) ||
              spokenProductName.includes(p.name.toLowerCase())
          );

          if (foundProduct) {
            console.log("Found product:", foundProduct.name);
            axios
              .post("/api/cart-items", {
                productId: foundProduct.id,
                quantity: 1,
              })
              .then(() => {
                loadCart();
                console.log(`Successfully added ${foundProduct.name} to cart.`);
              })
              .catch((err) => {
                console.error("Error adding product to cart:", err);
              });
            commandHandled = true; // Mark as handled even if API call fails
          } else {
            console.log(`Product "${spokenProductName}" not found.`);
          }
        }
      } else {
        console.log("Unrecognized voice command.");
      }

      // Always stop listening and clear transcript after attempting to process a command
      stopListening();
      clearTranscript(); // Clear the transcript state to prevent re-runs on subsequent renders
    }
  }, [
    transcript,
    products,
    navigate,
    stopListening,
    clearTranscript,
    loadCart,
  ]); // Add clearTranscript to dependencies

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header
        cart={cart}
        startVoiceListening={startListening}
        isVoiceListening={listening}
      />

      <div
        style={{
          position: "fixed",
          top: "70px",
          right: "20px",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          zIndex: 1001,
          fontSize: "14px",
          display: listening || speechError || transcript ? "block" : "none",
        }}
      >
        {listening && "Listening for commands..."}
        {speechError && `Error: ${speechError}`}
        {transcript &&
          !listening &&
          !speechError &&
          `Last command: "${transcript}"`}
      </div>

      <Routes>
        <Route index element={<HomePage cart={cart} loadPage={loadCart} />} />
        <Route
          path="checkout"
          element={<Checkout cart={cart} loadPage={loadCart} />}
        />
        <Route
          path="orders"
          element={<OrderPage cart={cart} loadPage={loadCart} />}
        />
        <Route path="tracking" element={<TrackingPage cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
