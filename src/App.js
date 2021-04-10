import React, { useEffect, useState } from "react";
import WorkerList from "./components/WorkerList"

import Workers from "./misc";
import "./App.css";
import Multiplier from "./components/Multiplier";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem("CoalMiner.money")) || 10
  );
  const [multiplier, setMultiplier] = useState(1);
  // for saving money
  useEffect(() => {
    localStorage.setItem("CoalMiner.money", JSON.stringify(money))
  }, [money])

  return (
    <>
      <h1>Coal Miners</h1>
      <h2>Current Money: {money}</h2>
      <WorkerList workers={Workers} money={money} setMoney={setMoney} multiplier={multiplier} />
      <Multiplier setMultiplier={setMultiplier} />
    </>
  );
}

export default App;