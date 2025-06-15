import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Only for local input state now

// Receive new props for search control
export function Header({
  cart,
  isListening,
  toggleListening,
  currentSearchTerm,
  handleManualSearch,
}) {
  const navigate = useNavigate();
  // Local state for the search input field itself, kept in sync with App's currentSearchTerm
  const [searchInput, setSearchInput] = useState(currentSearchTerm || "");

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  // Effect to update local searchInput when currentSearchTerm changes from App (e.g., via voice)
  useEffect(() => {
    setSearchInput(currentSearchTerm || "");
  }, [currentSearchTerm]);

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleManualSearch(searchInput);
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-NavLink">
            <img className="logo" alt="Website Logo" />
            <span className="mobile-logo"></span>
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={searchInput} // Controlled component
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeyPress} // Handle Enter key
          />

          <button
            className="search-button"
            onClick={() => handleManualSearch(searchInput)}
          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <button
            className="voice-search-button"
            onClick={toggleListening}
            style={{
              backgroundColor: isListening ? "#007bff" : "transparent",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "5px 10px",
              color: "white",
            }}
          >
            {isListening ? "Stop Listening" : "Start Voice Search"}
          </button>

          <NavLink className="orders-NavLink header-NavLink" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-NavLink header-NavLink" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
