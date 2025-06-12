import { OrderPage } from "./pages/order/OrderPage";
import { HomePage } from "./pages/home/HomePage";
import { Checkout } from "./pages/checkout/CheckoutPage";
import { TrackingPage } from "./pages/order/TrackingPage";
import "./App.css";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  const [voiceCommand, setVoiceCommand] = useState(null); // New state for voice commands

  const loadPage = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadPage();
  }, []);

  // Function to handle new voice commands from Header
  const handleVoiceCommand = (command) => {
    setVoiceCommand(command);
  };

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadPage={loadPage}
            voiceCommand={voiceCommand} // Pass voiceCommand to HomePage
            setVoiceCommand={setVoiceCommand} // Pass setter to clear command after use
          />
        }
      />
      <Route
        path="checkout"
        element={<Checkout cart={cart} loadPage={loadPage} />}
      />
      <Route
        path="orders"
        element={<OrderPage cart={cart} loadPage={loadPage} />}
      />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
    </Routes>
  );
}

export default App;
