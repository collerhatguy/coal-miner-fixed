import React, { useEffect, useState } from "react";
import WorkerList from "./components/WorkerList"

import "./css/App.css";
import MultiplierList from "./components/MultiplierList";

function App() {
  const [money, setMoney] = useState(10
    // JSON.parse(localStorage.getItem("CoalMiner.money")) || 10
  );
  const [multiplier, setMultiplier] = useState(1);
  useEffect(() => {
    localStorage.setItem("GoldMiner.money", JSON.stringify(money))
  }, [money])
  return (
    <>
      <h2>Current Money: {money}</h2>
      <WorkerList money={money} setMoney={setMoney} multiplier={multiplier} />
      <MultiplierList setMultiplier={setMultiplier} />
    </>
  );
}

export default App;