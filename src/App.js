import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const { advice } = response.data.slip;
      setAdvice(advice);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("");
      setErrorMessage("Failed to fetch advice. Please try again later.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAdvice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1 className="title">Advice update every 5 seconds</h1>
      <div className="card">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <h2 className="heading">{advice}</h2>
        )}
        <button className="button" onClick={fetchAdvice}>
          <span>GIVE ME ADVICE!</span>
        </button>
      </div>
    </div>
  );
};

export default App;
