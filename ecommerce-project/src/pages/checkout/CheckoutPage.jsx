// ecommerce-project/src/pages/checkout/CheckoutPage.jsx

import "./CheckoutPage.css";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { useState, useEffect } from "react";
// import { CheckoutHeader } from "./CheckoutHeader"; // REMOVE THIS LINE
import { PaymentSummary } from "./PaymentSummay";

export function Checkout({ cart, loadPage }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getChectOutData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);
    };
    getChectOutData();
  }, []);

  useEffect(() => {
    const getChectOutData = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    getChectOutData();
  }, [cart]);

  window.axios = axios;
  return (
    <>
      {/* REMOVED <link rel="icon"> and <title> from here, as App.jsx handles global metadata */}
      {/* REMOVED <CheckoutHeader cart={cart} /> from here */}
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadPage={loadPage}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadPage={loadPage} />
        </div>
      </div>
    </>
  );
}
