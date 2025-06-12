import "./CheckoutHeader.css";
import { Link } from "react-router-dom"; // Updated to react-router-dom
export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img
                className="logo"
                src="/images/UELogo.png"
                alt="Website Logo"
              />{" "}
              {/* Updated logo path */}
              <img
                className="mobile-logo"
                src="/images/UELogo.png"
                alt="Mobile Logo"
              />{" "}
              {/* Updated mobile logo path */}
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {" "}
              {/* Changed to Link for consistent routing */}
              {totalQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  );
}
