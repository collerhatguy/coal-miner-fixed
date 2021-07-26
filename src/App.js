import React, { useState } from "react";
import { MoneyContext } from "./hooks/useContext";
import "./css/App.css";


import WorkerList from "./components/WorkerList";
import MultiplierList from "./components/MultiplierList";

function App() {
  const [money, setMoney] = useState(10);
  const [multiplier, setMultiplier] = useState(1);
  return (
    <MoneyContext.Provider value={[money, setMoney]}>
      <header>
        <div className="text-container">
          <h1>Gold Miners</h1>
          <h2>Current Money: <span data-cy="money">{money}</span></h2>
        </div>
        <MultiplierList setMultiplier={setMultiplier} />
      </header>
      <main>
        <WorkerList multiplier={multiplier} />
      </main>
    </MoneyContext.Provider>
  );
}

export default App;