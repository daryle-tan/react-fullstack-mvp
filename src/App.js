import "./App.css";
import React from "react";
import ShowPortfolio from "./components/ShowPortfolio.js";
import Header from "./components/Header.js";
import Form from "./components/Form.js";

function App() {
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
