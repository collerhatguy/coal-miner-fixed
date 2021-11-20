import React, { useState } from "react";
import { MoneyContext, MultiplierContext } from "./hooks/useContext";
import "./css/App.css";

import WorkerList from "./components/WorkerList";
import MultiplierList from "./components/MultiplierList";

function App() {
  const [money, setMoney] = useState(10);
  const [multiplier, setMultiplier] = useState(1);
  return (
    <MoneyContext.Provider value={[money, setMoney]}>
      <MultiplierContext.Provider value={multiplier}>
        <header>
          <div className="text-container">
            <h1>Gold Miners</h1>
            <h2>
              <span data-cy="money">
                {money}$
              </span>
            </h2>
          </div>
          <MultiplierList setMultiplier={setMultiplier}/>
        </header>
        <main>
          <WorkerList/>
        </main>
      </MultiplierContext.Provider>
    </MoneyContext.Provider>
  );
}

export default App;