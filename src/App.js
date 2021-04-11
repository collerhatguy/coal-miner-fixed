import React, { useEffect, useState } from "react";
import WorkerList from "./components/WorkerList"

import Workers from "./misc";
import "./css/App.css";
import Multiplier from "./components/Multiplier";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(10
    // JSON.parse(localStorage.getItem("CoalMiner.money")) || 10
  );
  const [multiplier, setMultiplier] = useState(1);
  // for saving money
  useEffect(() => {
    localStorage.setItem("coalMiner.money", JSON.stringify(money))
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