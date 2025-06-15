import "./CheckoutPage.css";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { useState, useEffect } from "react";
// Correctly importing CheckoutHeader as a named import
import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentSummary } from "./PaymentSummay";

export function Checkout({
  cart,
  loadPage,
  isListening,
  toggleListening,
  handleManualSearch,
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getChectOutData = async () => {
      try {
        const response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Error fetching delivery options:", error);
        setDeliveryOptions([]);
      }
    };
    getChectOutData();
  }, []);

  useEffect(() => {
    const getPaymentSummary = async () => {
      try {
        const response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Error fetching payment summary:", error);
        setPaymentSummary(null);
      }
    };
    getPaymentSummary();
  }, [cart]);

  window.axios = axios;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader
        cart={cart}
        isListening={isListening}
        toggleListening={toggleListening}
        handleManualSearch={handleManualSearch}
      />
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
