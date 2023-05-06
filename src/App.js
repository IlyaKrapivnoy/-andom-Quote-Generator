import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const TIMEOUT_MS = 3000;

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

  const timeout = TIMEOUT_MS;

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAdvice();
    }, timeout);
    return () => clearInterval(intervalId);
  }, []);

  const updEverySec = () => {
    let str = timeout.toString();

    let i = str.length - 1;
    while (i >= 0 && str[i] === "0") {
      i--;
    }

    if (str[i] !== ".") {
      str = str.substring(0, i + 1);
    }

    str = str.replace(/0+$/, "");

    const num = Number(str);
    return isNaN(num) ? "a few" : num;
  };

  const updEverySecVal = updEverySec();

  return (
    <div className="app">
      <h1 className="title">Advice update every {updEverySecVal} seconds</h1>
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
