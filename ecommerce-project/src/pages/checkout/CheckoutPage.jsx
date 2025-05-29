import "./CheckoutPage.css";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentSummary } from "./PaymentSummay";
export function Checkout({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get("/api/delivery-options?expand=estimatedDeliveryTime")
  //     .then((response) => {
  //       setDeliveryOptions(response.data);
  //     });
  //   axios.get("/api/payment-summary").then((response) => {
  //     setPaymentSummary(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const getChectOutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);
      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    getChectOutData();
  }, []);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
