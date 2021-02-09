import React, { useEffect, useState } from "react";
import { currency, Item } from "./misc";
import MultiplierContainer from "./components/MultiplierContainer";
import UpgradeContainer from "./components/UpgradeContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./App.css";


function App() {
  // create the items w/ the clss function
  const Miners = new Item(10, 10000, 5000, 100, 1, "Miners");
  const Drills = new Item(1000, 1000, 100000, 300, 10, "Drills");
  

  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem(currency.OWNED_LOCAL_STORAGE_KEY)) || 10
  );

  // set multiplier to one
  const [multiplier, setMultiplier] = useState(1);
  const upgradeSpeed = (item) => {
     // check if we have enough money
     if (!(money >= item.speedUpgradeCost)) return;
     // subtract cost from money 
     setMoney(money - item.speedUpgradeCost);
     // apply upgrade based on built in rate
     item.speed = item.speed - item.speedUpgradeRate;
     // increase cost of upgrade
     item.speedUpgradeCost += item.speedUpgradeCost;
     // save our current speed
     localStorage.setItem(item.CURRENT_SPEED_LOCAL_STORAGE_KEY, JSON.stringify(item.speed));
     // check if we have hit the upgrade limit
     if (!(item.speed - item.speedUpgradeRate <= 0)) return;
     // if we have than save that
     localStorage.setItem(item.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
     // remove the upgrade button
     document.getElementById(`${item}SpeedUpgradeButton`).remove();
  }

  const saveVariables = () => {
    Miners.saveAmount(Miners.owned);
    Drills.saveAmount(Drills.owned);
    currency.save(money);
    alert("Stats Saved");
  }
  // would like to compile these into one function that takes an arguement but have to get around the naming styles
  const buyItem = (Item) => {
    if (money < Item.cost * multiplier) return;
    setMoney(money - Item.cost * multiplier);
    Item.owned += multiplier;
    Item.cost += multiplier;
  };
  const miningItem = (Item) => {
    setMoney((prevMoney) => prevMoney + (Item.owned * Item.productionRate));
  };
  debugger;
  // add to money based on built in speeds
  useEffect(() => {
    setInterval(miningItem(Miners), Miners.speed);
    setInterval(miningItem(Drills), Drills.speed);
  }, []);
  return (
    <>
      <h1>Coal Miners</h1>
      <DisplayContainer props={money, Miners.owned, Drills.owned}/>
      <div id="buyContainer">
        <h2>Buy here:</h2>
        <button onClick={buyItem(Miners)}>
          Miners ({Miners.cost * multiplier}$)
        </button>
        <button onClick={buyItem(Drills)}>
          Drills ({Drills.cost * multiplier}$)
        </button>
      </div>
      <UpgradeContainer props={
        upgradeSpeed, 
        Miners,
        Drills
      }/>
      {/* passing a function that allows the child to change the multiplier */}
      <MultiplierContainer  changeMultiplier={multiplier => setMultiplier(multiplier)}/>
      <button id="saveButton" onClick={saveVariables}>
        Save
      </button>
    </>
  );
}

export default App;