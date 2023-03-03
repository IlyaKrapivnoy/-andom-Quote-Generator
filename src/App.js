import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        console.log("quote", advice);

        setAdvice(advice);
      })
      .catch((error) => {
        console.log("hm", error);
      });
  };

  return (
    <div className="app">
      <h1 className="title">Advice update every 5 seconds</h1>
      <div className="card">
        <h2 className="heading">{advice}</h2>
        <button className="button" onClick={fetchAdvice}>
          <span>GIVE ME ADVICE!</span>
        </button>
      </div>
    </div>
  );
};

export default App;
