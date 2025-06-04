// ecommerce-project/src/hooks/useSpeechRecognition.js

import { useState, useEffect, useRef } from "react";

/**
 * Custom React Hook for integrating Web Speech API (Speech Recognition).
 * Provides functionality to start/stop listening and returns the transcribed text.
 *
 * @returns {object} An object containing:
 * - {string} transcript: The latest transcribed text from speech.
 * - {boolean} listening: True if speech recognition is active, false otherwise.
 * - {function} startListening: Function to start speech recognition.
 * - {function} stopListening: Function to stop speech recognition.
 * - {function} clearTranscript: Function to manually clear the current transcript.
 * - {string|null} error: Any error message encountered during speech recognition.
 */
export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    console.log("useEffect in useSpeechRecognition running...");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Web Speech API is not supported by this browser. Please try Chrome or Edge."
      );
      console.error("Web Speech API not supported.");
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
      console.log("Speech result:", speechResult);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
      console.log("Speech recognition ended.");
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
    );

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("Speech recognition cleanup: stopped.");
      }
    };
  }, []);

  /**
   * Starts the speech recognition process.
   */
  const startListening = () => {
    console.log(
      "startListening function called. Current listening state:",
      listening
    );
    if (recognitionRef.current && !listening) {
      setTranscript(""); // Clear previous transcript before starting
      setError(null);
      try {
        recognitionRef.current.start();
        setListening(true);
        console.log("Speech recognition started successfully.");
      } catch (e) {
        console.error("Error starting speech recognition:", e);
        setError(
          "Could not start speech recognition. Please ensure microphone access."
        );
        setListening(false);
      }
    } else if (listening) {
      console.log("Already listening, not starting again.");
    } else {
      console.log("recognitionRef.current is null, cannot start listening.");
    }
  };

  /**
   * Stops the speech recognition process.
   */
  const stopListening = () => {
    console.log(
      "stopListening function called. Current listening state:",
      listening
    );
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
      console.log("Speech recognition explicitly stopped.");
    }
  };

  /**
   * Clears the current transcript.
   */
  const clearTranscript = () => {
    setTranscript("");
    console.log("Transcript cleared.");
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
    error,
  };
};
