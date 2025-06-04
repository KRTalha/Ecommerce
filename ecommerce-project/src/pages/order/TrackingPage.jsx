// ecommerce-project/src/pages/order/TrackingPage.jsx

// import { Header } from "../../components/Header"; // REMOVE THIS LINE
import "./TrackingPage.css";
// import dayjs from "dayjs";
// import { Header } from "../../components/Header"; // REMOVE THIS LINE (duplicate)
// import { useParams } from "react-router";
// import axios from "axios";
// import { useEffect, useState } from "react";

export function TrackingPage({ cart }) {
  // The commented-out code below was likely from an earlier version or example.
  // We're removing it to ensure a clean slate and avoid conflicts.
  // const { orderId, productId } = useParams();
  // const [order, setOrder] = useState(null);

  // useEffect(() => {
  //   const fetchTrackingData = async () => {
  //     const response = await axios.get(
  //       `/api/orders/${orderId}?expand=products`
  //     );
  //     setOrder(response.data);
  //   };

  //   fetchTrackingData();
  // }, [orderId]);

  // if (!order) {
  //   return null;
  // }

  // const orderProduct = order.products.find((orderProduct) => {
  //   return orderProduct.productId === productId;
  // });

  return (
    <>
      {/* REMOVED <Header cart={cart} /> from here */}
      {/* REMOVED <title> and <link rel="icon"> from here, as App.jsx handles global metadata */}

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on
            {/* {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")} */}
          </div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">Quantity: 1</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
            alt="Product Image"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
