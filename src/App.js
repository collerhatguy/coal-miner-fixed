import React, { useEffect, useState } from "react";
import WorkerList from "./components/WorkerList"

import Workers from "./misc";
import "./App.css";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem(currency.OWNED_LOCAL_STORAGE_KEY)) || 10
  );
  const [multiplier, setMultiplier] = useState(1);

 
  const setMultiplier1 = () => {
    setMultiplier(1);
  };
  const setMultiplier10 = () => {
    setMultiplier(10);
  };
  const setMultiplier100 = () => {
    setMultiplier(100);
  };

  return (
    <>
      <h1>Coal Miners</h1>
      <WorkerList workers={Workers}/ >
      <div id="multiplierContainer">
        <fieldset>
          <legend>Multipliers for buying in mass:</legend>
          <label for="1multiplier">1x</label>
          <input
            type="radio"
            value="1"
            id="1multiplier"
            name="multiplier"
            onClick={setMultiplier1}
          ></input>
          <label for="10multiplier">10x</label>
          <input
            type="radio"
            value="10"
            id="10multiplier"
            name="multiplier"
            onClick={setMultiplier10}
          ></input>
          <label for="100multiplier">100x</label>
          <input
            type="radio"
            value="100"
            id="100multiplier"
            name="multiplier"
            onClick={setMultiplier100}
          ></input>
        </fieldset>
      </div>
    </>
  );
}

export default App;