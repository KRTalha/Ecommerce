import "./OrdersPage.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { OrderGrid } from "./OrderGrid";

export function OrderPage({
  cart,
  loadPage,
  isListening,
  toggleListening,
  handleManualSearch,
}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };
    fetchOrderData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <Header
        cart={cart}
        isListening={isListening}
        toggleListening={toggleListening}
        currentSearchTerm={""} // Orders page doesn't have a search bar, so pass empty term
        handleManualSearch={handleManualSearch}
      />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadPage={loadPage} />
      </div>
    </>
  );
}
