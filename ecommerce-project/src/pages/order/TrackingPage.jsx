// import { Header } from "../../components/Header";
import "./TrackingPage.css";
// import dayjs from "dayjs";
import { Header } from "../../components/Header";
// import { useParams } from "react-router";
// import axios from "axios";
// import { useEffect, useState } from "react";

export function TrackingPage({ cart }) {
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
      <Header cart={cart} />
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

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
