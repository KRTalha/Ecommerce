import { OrderPage } from "./pages/order/OrderPage";
import { HomePage } from "./pages/home/HomePage";
import { Checkout } from "./pages/checkout/CheckoutPage";
import { TrackingPage } from "./pages/order/TrackingPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [voiceCommand, setVoiceCommand] = useState(null); // Raw voice command from mic
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // New states for managing search:
  const [currentSearchTerm, setCurrentSearchTerm] = useState(""); // The actual search query
  const [searchActionTrigger, setSearchActionTrigger] = useState(0); // Increments to force search re-run

  const navigate = useNavigate();

  const loadPage = async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart items:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  // Effect to handle voice commands (navigation, scrolling, and setting search states)
  useEffect(() => {
    if (!voiceCommand) return;

    const command = voiceCommand.toLowerCase();
    console.log("App received voice command:", command);

    let commandHandledByApp = false;

    // Handle navigation commands
    if (command.includes("go to home") || command.includes("show homepage")) {
      navigate("/");
      commandHandledByApp = true;
    } else if (
      command.includes("go to checkout") ||
      command.includes("show checkout")
    ) {
      navigate("/checkout");
      commandHandledByApp = true;
    } else if (
      command.includes("go to orders") ||
      command.includes("show orders")
    ) {
      navigate("/orders");
      commandHandledByApp = true;
    } else if (command.includes("track package")) {
      navigate("/tracking");
      commandHandledByApp = true;
    }
    // Handle scrolling commands
    else if (command.includes("scroll up")) {
      window.scrollBy({ top: -window.innerHeight * 0.75, behavior: "smooth" });
      commandHandledByApp = true;
    } else if (command.includes("scroll down")) {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
      commandHandledByApp = true;
    }
    // Handle search commands (these will update search states and trigger HomePage's useEffect)
    else if (command.startsWith("search for ")) {
      const query = command.replace("search for ", "").trim();
      setCurrentSearchTerm(query);
      setSearchActionTrigger((prev) => prev + 1); // Force search re-run
      commandHandledByApp = true; // Mark as handled, so voiceCommand can be cleared
    } else if (command.includes("show all products")) {
      setCurrentSearchTerm("");
      setSearchActionTrigger((prev) => prev + 1); // Force search re-run
      commandHandledByApp = true; // Mark as handled
    }

    // Clear the voiceCommand after it has been fully processed by App.jsx
    if (commandHandledByApp) {
      setVoiceCommand(null);
    }
  }, [voiceCommand, navigate]); // Depend on voiceCommand and navigate

  // Effect to manage SpeechRecognition instance lifecycle
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported by your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started in App.jsx");
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      console.log("Voice command heard (App.jsx):", command);

      if (
        command.includes("stop listening") ||
        command.includes("stop voice")
      ) {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setVoiceCommand(null); // Clear any pending voice command
        return;
      }

      setVoiceCommand(command); // Set the raw command for App.jsx's useEffect to process
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended in App.jsx.");
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech recognition error in App.jsx:", event.error);
      if (event.error !== "no-speech") {
        console.warn(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Function to toggle voice recognition (called from Header buttons)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  // Function to handle manual search from the search bar
  const handleManualSearch = (query) => {
    setCurrentSearchTerm(query);
    setSearchActionTrigger((prev) => prev + 1); // Force search re-run
    navigate("/"); // Ensure we are on the homepage for search results
  };

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadPage={loadPage}
            // Pass search-related states and functions
            currentSearchTerm={currentSearchTerm}
            searchActionTrigger={searchActionTrigger}
            // Pass voice control states/functions
            isListening={isListening}
            toggleListening={toggleListening}
            // Pass manual search function to header
            handleManualSearch={handleManualSearch}
          />
        }
      />
      <Route
        path="checkout"
        element={
          <Checkout
            cart={cart}
            loadPage={loadPage}
            isListening={isListening}
            toggleListening={toggleListening}
            handleManualSearch={handleManualSearch} // Pass to CheckoutHeader
          />
        }
      />
      <Route
        path="orders"
        element={
          <OrderPage
            cart={cart}
            loadPage={loadPage}
            isListening={isListening}
            toggleListening={toggleListening}
            handleManualSearch={handleManualSearch} // Pass to OrderHeader (Header component)
          />
        }
      />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
    </Routes>
  );
}

export default App;
