// ecommerce-project/src/pages/order/OrderPage.jsx

import "./OrdersPage.css";
import axios from "axios";

import { useEffect, useState } from "react";
// import { Header } from "../../components/Header"; // REMOVE THIS LINE
import { OrderGrid } from "./OrderGrid";

export function OrderPage({ cart, loadPage }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      {/* REMOVED <title> and <link rel="icon"> from here, as App.jsx handles global metadata */}
      {/* REMOVED <Header cart={cart} /> from here */}

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadPage={loadPage} />
      </div>
    </>
  );
}
