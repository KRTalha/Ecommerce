import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Header({ cart, onVoiceCommand }) {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null); // State to hold the SpeechRecognition instance

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const toggleVoiceRecognition = () => {
    if (isListening && recognition) {
      // If currently listening, stop
      recognition.stop();
      setIsListening(false);
      console.log("Voice recognition stopped.");
      return;
    }

    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported by your browser.");
      return;
    }

    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true; // Keep listening
    newRecognition.lang = "en-US";
    newRecognition.interimResults = false;

    newRecognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    newRecognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      console.log("Voice command received:", command);

      if (
        command.includes("stop listening") ||
        command.includes("stop voice")
      ) {
        newRecognition.stop();
        setIsListening(false);
        console.log("Voice recognition stopped by command.");
        return;
      }

      // Handle navigation commands
      if (command.includes("go to home") || command.includes("show homepage")) {
        navigate("/");
      } else if (
        command.includes("go to checkout") ||
        command.includes("show checkout")
      ) {
        navigate("/checkout");
      } else if (
        command.includes("go to orders") ||
        command.includes("show orders")
      ) {
        navigate("/orders");
      } else if (command.includes("track package")) {
        navigate("/tracking");
      }
      // Pass the command to App.jsx for product search or other global actions
      if (onVoiceCommand) {
        onVoiceCommand(command);
      }
    };

    newRecognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
      // If continuous listening was intended, you might restart it here
      // but for "stop listening" command, we want it to truly stop.
      // If the user explicitly stops it via command, we don't want to restart.
      // If it stopped for other reasons (e.g., no speech for a while), we could restart.
      // For this request, we'll assume a clean stop.
    };

    newRecognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        // Ignore common no-speech error for a better UX
        alert("Speech recognition error: " + event.error);
      }
    };

    setRecognition(newRecognition); // Store the recognition instance in state
    newRecognition.start();
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
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <button
            className="voice-search-button"
            onClick={toggleVoiceRecognition}
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
