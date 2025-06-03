// ecommerce-project/src/App.jsx

import { OrderPage } from "./pages/order/OrderPage";
import { HomePage } from "./pages/home/HomePage";
import { Checkout } from "./pages/checkout/CheckoutPage";
import { TrackingPage } from "./pages/order/TrackingPage";
// import { Header } from "./components/Header";
import { Header } from "./components/Header";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react"; // Import useCallback
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
    error: speechError,
  } = useSpeechRecognition();

  // Wrap loadCart in useCallback
  const loadCart = useCallback(async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []); // Empty dependency array means it only gets created once

  // Wrap loadProducts in useCallback
  const loadProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, []); // Empty dependency array means it only gets created once

  // Initial data loading for cart and products on component mount
  useEffect(() => {
    loadCart();
    loadProducts();
  }, [loadCart, loadProducts]); // Add loadCart and loadProducts to dependencies

  // Effect to handle transcribed speech
  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      console.log("Voice command:", lowerTranscript);

      // --- Navigation Commands ---
      if (
        lowerTranscript.includes("go to home page") ||
        lowerTranscript.includes("go home")
      ) {
        navigate("/");
        stopListening();
      } else if (
        lowerTranscript.includes("go to checkout page") ||
        lowerTranscript.includes("go to cart")
      ) {
        navigate("/checkout");
        stopListening();
      } else if (
        lowerTranscript.includes("go to orders page") ||
        lowerTranscript.includes("view my orders")
      ) {
        navigate("/orders");
        stopListening();
      }
      // --- Add Product Command ---
      else if (
        lowerTranscript.includes("add") &&
        lowerTranscript.includes("to cart")
      ) {
        const productNameMatch = lowerTranscript.match(/add (.*) to cart/);
        if (productNameMatch && productNameMatch[1]) {
          const spokenProductName = productNameMatch[1].trim();
          console.log("Attempting to add:", spokenProductName);

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
                console.log(`Added ${foundProduct.name} to cart.`);
              })
              .catch((err) => {
                console.error("Error adding product to cart:", err);
              });
          } else {
            console.log(`Product "${spokenProductName}" not found.`);
          }
        }
        stopListening();
      }
    }
  }, [transcript, products, navigate, stopListening, loadCart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      {/* Header is now OUTSIDE of Routes so it's always rendered and receives props */}
      <Header
        cart={cart}
        startVoiceListening={startListening}
        isVoiceListening={listening}
      />

      {/* Voice control status display */}
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
          display: listening || speechError ? "block" : "none",
        }}
      >
        {listening && "Listening for commands..."}
        {speechError && `Error: ${speechError}`}
        {transcript && !listening && `Last command: "${transcript}"`}
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
