import React, { useEffect, useState } from "react";
import { MoneyContext, MultiplierContext } from "./hooks/useContext";
import useToggle from "./hooks/useToggle";
import "./css/App.css";

import WorkerList from "./components/WorkerList";
import MultiplierList from "./components/MultiplierList";

function App() {
  const [money, setMoney] = useState(10);
  const [multiplier, setMultiplier] = useState(1);
  const [showMultipliers, toggleShowMultipliers] = useToggle(false);
  
  useEffect(() => {
    if (money >= 1000) toggleShowMultipliers(true);
  }, [money])

  return (
    <MoneyContext.Provider value={[money, setMoney]}>
      <MultiplierContext.Provider value={multiplier}>
        <header>
          <div className="text-container">
            <h1>Gold Miners</h1>
            <h2 data-cy="money">
              {money}$
            </h2>
          </div>
          {showMultipliers && <MultiplierList setMultiplier={setMultiplier}/>}
        </header>
        <main>
          <WorkerList/>
        </main>
      </MultiplierContext.Provider>
    </MoneyContext.Provider>
  );
}

export default App;