import React, { useState } from "react";

import { currency, Worker } from "./misc";
import "./App.css";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem(currency.OWNED_LOCAL_STORAGE_KEY)) || 10
  );

  const miners = new Worker(10, 1, 100, "Miner")
  const drills = new Worker(100, 5, 1000, "Drill")

  // const [ownedMiners, setOwnedMiners] = useState(
  //   JSON.parse(localStorage.getItem(miner.OWNED_LOCAL_STORAGE_KEY)) || 0
  // );
  // const [ownedDrills, setOwnedDrills] = useState(
  //   JSON.parse(localStorage.getItem(drill.OWNED_LOCAL_STORAGE_KEY)) || 0
  // ); 
  // set multiplier to one
  const [multiplier, setMultiplier] = useState(1);

  const saveVariables = () => {
    // create method for saving Worker stats
    currency.save(money);
    alert("Stats Saved");
  }
  const setMultiplier1 = () => {
    setMultiplier(1);
  };
  const setMultiplier10 = () => {
    setMultiplier(10);
  };
  const setMultiplier100 = () => {
    setMultiplier(100);
  };
  // I would like to set this as a method for worker in the future
  const buyWorker = (worker) => {
    const totalCost = worker.state.cost * multiplier;
    if (money < totalCost) return;
    setMoney(money - totalCost);
    worker.setOwned(prevOwned => {prevOwned += multiplier});
    worker.setCost(prevCost => {prevCost += multiplier});
  };
  const miningWorker = (worker) => {
    setMoney((prevMoney) => prevMoney + worker.state.owned * worker.state.productionRate);
  };
  
  const upgradeMinerSpeed = () => {
    // check if we have enough money
    if (!(money >= miner.speedUpgradeCost)) return;
    // subtract cost from money 
    setMoney(money - miner.speedUpgradeCost);
    // apply upgrade based on built in rate
    miner.speed = miner.speed - miner.speedUpgradeRate;
    // increase cost of upgrade
    miner.speedUpgradeCost += miner.speedUpgradeCost;
    // save our current speed
    localStorage.setItem(miner.CURRENT_SPEED_LOCAL_STORAGE_KEY, JSON.stringify(miner.speed));
    // check if we have hit the upgrade limit
    if (!(miner.speed - miner.speedUpgradeRate <= 0)) return;
    // if we have than save that
    localStorage.setItem(miner.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
    // remove the upgrade button
    document.getElementById("minerSpeedUpgradeButton").remove();
  };
  const upgradeDrillSpeed = () => {
    // check if we have enough money
    if (!(money >= drill.speedUpgradeCost)) return;
    // subtract cost from money 
    setMoney(money - drill.speedUpgradeCost);
    // apply upgrade based on built in rate
    drill.speed = drill.speed - drill.speedUpgradeRate;
    // increase cost of upgrade
    drill.speedUpgradeCost += drill.speedUpgradeCost;
    // save our current speed
    localStorage.setItem(drill.CURRENT_SPEED_LOCAL_STORAGE_KEY, JSON.stringify(drill.speed));
    // check if we have hit the upgrade limit
    if (!(drill.speed - drill.speedUpgradeRate <= 0)) return;
    // if we have than save that
    localStorage.setItem(drill.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
    // remove the upgrade button
    document.getElementById("drillSpeedUpgradeButton").remove();
  };
  // add to money based on built in speeds
  setInterval(miningMiners, miner.speed);
  setInterval(miningDrills, drill.speed);
  return (
    <>
      <h1>Coal Miners</h1>
      <div id="display">
        <h2>Money: {money}</h2>
        <h2>Miners: {ownedMiners}</h2>
        <div id="minersProgress"></div>
        <h2>Drills: {ownedDrills}</h2>
        <div id="drillsProgress"></div>
      </div>
      <div id="buyContainer">
        <h2>Buy here:</h2>
        <button onClick={() => {buyWorker(miners)}}>
          Miner ({miner.cost * multiplier}$)
        </button>
        <button onClick={() => {buyWorker(drills)}}>
          Drill ({drill.cost * multiplier}$)
        </button>
      </div>
      <div id="upgradeContainer">
        <h2>Upgrade here:</h2>
        <button id="minerSpeedUpgradeButton" onClick={upgradeMinerSpeed}>
          Miner Speed ({miner.speedUpgradeCost}$)
        </button>
        <button id="drillSpeedUpgradeButton" onClick={upgradeDrillSpeed}>
          Drill Speed ({drill.speedUpgradeCost}$)
        </button>
      </div>
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
        <button id="saveButton" onClick={saveVariables}>
          Save
        </button>
      </div>
    </>
  );
}

export default App;