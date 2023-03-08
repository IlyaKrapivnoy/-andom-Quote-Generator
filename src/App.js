import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAdvice = async () => {
    try {
      const { data } = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(data.slip.advice);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("");
      setErrorMessage(`Failed to fetch advice. Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAdvice();
    }, 5000);
    return () => clearInterval(intervalId);
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
