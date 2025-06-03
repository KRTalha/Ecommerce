// ecommerce-project/src/hooks/useSpeechRecognition.js

import { useState, useEffect, useRef } from "react";

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    console.log("useEffect in useSpeechRecognition running..."); // ADD THIS LINE
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Web Speech API is not supported by this browser. Please try Chrome or Edge."
      );
      console.error("Web Speech API not supported."); // ADD THIS LINE
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setError(null);
      console.log("Speech result:", speechResult); // ADD THIS LINE
    };

    recognitionRef.current.onend = () => {
      setListening(false);
      console.log("Speech recognition ended."); // ADD THIS LINE
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(
        `Speech recognition error: ${event.error}. Please ensure microphone access is granted.`
      );
      setListening(false);
    };

    console.log(
      "SpeechRecognition object initialized:",
      recognitionRef.current
    ); // ADD THIS LINE

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("Speech recognition cleanup: stopped."); // ADD THIS LINE
      }
    };
  }, []);

  const startListening = () => {
    console.log(
      "startListening function called. Current listening state:",
      listening
    ); // ADD THIS LINE
    if (recognitionRef.current && !listening) {
      setTranscript("");
      setError(null);
      try {
        recognitionRef.current.start();
        setListening(true);
        console.log("Speech recognition started successfully."); // ADD THIS LINE
      } catch (e) {
        console.error("Error starting speech recognition:", e);
        setError(
          "Could not start speech recognition. Please ensure microphone access."
        );
        setListening(false);
      }
    } else if (listening) {
      console.log("Already listening, not starting again."); // ADD THIS LINE
    } else {
      console.log("recognitionRef.current is null, cannot start listening."); // ADD THIS LINE
    }
  };

  const stopListening = () => {
    console.log(
      "stopListening function called. Current listening state:",
      listening
    ); // ADD THIS LINE
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
      console.log("Speech recognition explicitly stopped."); // ADD THIS LINE
    }
  };

  return { transcript, listening, startListening, stopListening, error };
};
