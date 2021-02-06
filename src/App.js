import React, { useState, useEffect } from "react";
import { miner } from "./miner";
import { drill } from "./drill";
import { currency } from "./misc";
import MultiplierContainer from "./components/MultiplierContainer";
import "./App.css";
import UpgradeContainer from "./components/UpgradeContainer";

function App() {
  // set everything back to default values based on local save
  const [money, setMoney] = useState(
    JSON.parse(localStorage.getItem(currency.OWNED_LOCAL_STORAGE_KEY)) || 10
  );
  const [ownedMiners, setOwnedMiners] = useState(
    JSON.parse(localStorage.getItem(miner.OWNED_LOCAL_STORAGE_KEY)) || 0
  );
  const [ownedDrills, setOwnedDrills] = useState(
    JSON.parse(localStorage.getItem(drill.OWNED_LOCAL_STORAGE_KEY)) || 0
  ); 
  // check if we hit the max limit for our upgrades
  // if (JSON.parse(localStorage.getItem(miner.UPGRADE_CAP_LOCAL_STORAGE_KEY)) = true) { 
  //   document.getElementById("minerSpeedUpgradeButton").remove();
  // }
  // if (JSON.parse(localStorage.getItem(drill.UPGRADE_CAP_LOCAL_STORAGE_KEY)) = true) { 
  //   document.getElementById("drillSpeedUpgradeButton").remove();
  // }
  // useEffect(currency.save(money), [money]);
  // useEffect(miner.saveAmount(ownedMiners), [ownedMiners]);
  // useEffect(drill.saveAmount(ownedDrills), [ownedDrills]);

  // set multiplier to one
  const [multiplier, setMultiplier] = useState(1);

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

  const saveVariables = () => {
    miner.saveAmount(ownedMiners);
    drill.saveAmount(ownedDrills);
    currency.save(money);
    alert("Stats Saved");
  }
 
  const buyMiner = () => {
    if (money < miner.cost * multiplier) return;
    setMoney(money - miner.cost * multiplier);
    setOwnedMiners(ownedMiners + multiplier);
    miner.cost += multiplier;
  };
  const buyDrill = () => {
    if (money < drill.cost * multiplier) return;
    setMoney(money - drill.cost * multiplier);
    setOwnedDrills(ownedDrills + multiplier);
    drill.cost += multiplier;
  };
  const miningMiners = () => {
    setMoney((prevMoney) => prevMoney + ownedMiners);
  };
  const miningDrills = () => {
    setMoney((prevMoney) => prevMoney + ownedDrills * 10);
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
        <h2>Drills: {ownedDrills}</h2>
      </div>
      <div id="buyContainer">
        <h2>Buy here:</h2>
        <button onClick={buyMiner}>
          Miner ({miner.cost * multiplier}$)
        </button>
        <button onClick={buyDrill}>
          Drill ({drill.cost * multiplier}$)
        </button>
      </div>
      <UpgradeContainer props={
        upgradeDrillSpeed(), 
        upgradeMinerSpeed(), 
        miner.speedUpgradeCost, 
        drill.speedUpgradeCost
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