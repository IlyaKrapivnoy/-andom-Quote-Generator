import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;

        setAdvice(advice);
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);

        setAdvice("");
        setErrorMessage("Failed to fetch advice. Please try again later.");
      });
  };

  return (
    <div className="app">
      <h1 className="title">Advice update every 5 seconds</h1>
      <div className="card">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <h2 className="heading">{advice}</h2>
        )}
        <h2 className="heading">{advice}</h2>
        <button className="button" onClick={fetchAdvice}>
          <span>GIVE ME ADVICE!</span>
        </button>
      </div>
    </div>
  );
};

export default App;
