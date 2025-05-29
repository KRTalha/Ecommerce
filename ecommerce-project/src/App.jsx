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
  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);
  // useEffect(() => {
  //   const fetchAppData = async () => {
  //     const response = await axios.get("/api/cart-item?expand=product");
  //     setCart(response.data);
  //   };
  //   fetchAppData();
  // }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<Checkout cart={cart} />} />
      <Route path="orders" element={<OrderPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
    </Routes>
  );
}

export default App;
