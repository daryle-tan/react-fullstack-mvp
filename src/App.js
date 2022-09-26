import "./App.css";
import React, { useEffect, useState } from "react";
import ShowPortfolio from "./components/ShowPortfolio.js";
import Header from "./components/Header.js";
import Form from "./components/Form.js";

function App() {
  // const [tokens, setTokens] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("here");
  //     const response = await fetch(`/api/crypto`);
  //     console.log(response);
  //     const newData = await response.json().then(() => {
  //       setTokens(newData);
  //       console.log(setTokens(newData));
  //     });
  //   };

  //   fetchData();
  // }, [tokens]);
  return (
    <div className="App">
      <Header />
      <div className="container">
        <ShowPortfolio />
        <Form />
      </div>
    </div>
  );
}

export default App;
