import React, { useEffect, useState } from "react";
import WorkerList from "./components/WorkerList"

import Workers from "./misc";
import "./App.css";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem("coalMiner.money")) || 10
  );
  const [multiplier, setMultiplier] = useState(1);
  


  return (
    <>
      <h1>Coal Miners</h1>
      <h2>Current Money: {money}</h2>
      <WorkerList workers={Workers} money={money} setMoney={setMoney} multiplier={multiplier} / >
      <div id="multiplierContainer">
        <fieldset>
          <legend>Multipliers for buying in mass:</legend>
          <label for="1multiplier">1x</label>
          <input
            type="radio"
            value={1}
            id="1multiplier"
            name="multiplier"
            onClick={e => {setMultiplier(e.target.value)}}
          ></input>
          <label for="10multiplier">10x</label>
          <input
            type="radio"
            value={10}
            id="10multiplier"
            name="multiplier"
            onClick={e => {setMultiplier(e.target.value)}}
          ></input>
          <label for="100multiplier">100x</label>
          <input
            type="radio"
            value={100}
            id="100multiplier"
            name="multiplier"
            onClick={e => {setMultiplier(e.target.value)}}
          ></input>
        </fieldset>
      </div>
    </>
  );
}

export default App;