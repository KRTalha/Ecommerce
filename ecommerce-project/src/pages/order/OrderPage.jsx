import "./OrdersPage.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { OrderGrid } from "./OrderGrid";

export function OrderPage({ cart, loadPage }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     const response = await axios.get("/api/orders?expand=products");
  //     setOrders(response.data);
  //   };
  //   fetchOrderData();
  // }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadPage={loadPage} />
      </div>
    </>
  );
}
