// ecommerce-project/src/components/Header.jsx

import "./Header.css";
import { NavLink } from "react-router-dom"; // Use react-router-dom for NavLink
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import PropTypes from "prop-types";
export function Header({ cart, startVoiceListening, isVoiceListening }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText || "");

  const navigate = useNavigate();

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };
  const searchProduct = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  function enterButton(event) {
    if (event.key === "Enter") {
      searchProduct();
    }
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-NavLink">
            <img
              className="logo"
              src="images/logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="mobile-logo"
              src="images/mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={updateSearchInput}
            onKeyDown={enterButton}
          />

          <button className="search-button" onClick={searchProduct}>
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search Icon"
            />
          </button>
        </div>

        <div className="right-section">
          {/* Microphone button for voice control */}
          <button
            className={`voice-control-button ${
              isVoiceListening ? "listening-active" : ""
            }`}
            onClick={() => {
              console.log("Microphone button clicked!"); // ADD THIS LINE
              startVoiceListening();
            }}
            title={isVoiceListening ? "Listening..." : "Start Voice Control"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="microphone-icon"
            >
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2h-2v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z" />
            </svg>
          </button>

          <NavLink className="orders-NavLink header-NavLink" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-NavLink header-NavLink" to="/checkout">
            <img
              className="cart-icon"
              src="images/icons/cart-icon.png"
              alt="Cart Icon"
            />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  cart: PropTypes.array.isRequired,
  startListening: PropTypes.func.isRequired,
  isVoiceListening: PropTypes.bool.isRequired,
};
