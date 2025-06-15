import "./CheckoutHeader.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Correctly exporting CheckoutHeader as a named function export
export function CheckoutHeader({
  cart,
  isListening,
  toggleListening,
  currentSearchTerm,
  handleManualSearch,
}) {
  let totalQuantity = 0;
  const [searchInput, setSearchInput] = useState(currentSearchTerm || "");

  useEffect(() => {
    setSearchInput(currentSearchTerm || "");
  }, [currentSearchTerm]);

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleManualSearch(searchInput);
    }
  };

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
              />
              <img
                className="mobile-logo"
                src="/images/UELogo.png"
                alt="Mobile Logo"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {totalQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              style={{
                flex: 1,
                marginRight: "10px",
                height: "38px",
                paddingLeft: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              className="search-button"
              onClick={() => handleManualSearch(searchInput)}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "0 15px",
                height: "40px",
                borderRadius: "5px",
                flexShrink: 0,
              }}
            >
              Search
            </button>
            <img
              src="images/icons/checkout-lock-icon.png"
              style={{ marginLeft: "15px", height: "36px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
