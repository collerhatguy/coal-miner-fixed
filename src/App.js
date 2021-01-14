import React, { useState, useEffect } from "react";
import { miner } from "./miner";
import { drill } from "./drill";
import { currency } from "./misc";
import "./App.css";

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
  // set multiplier to one
  const [multiplier, setMultiplier] = useState(1);
  // chack if we hit the max limit for our upgrades
  // if (JSON.parse(localStorage.getItem(miner.UPGRADE_CAP_LOCAL_STORAGE_KEY)) = true) { 
  //   document.getElementById("minerSpeedUpgradeButton").remove();
  // }
  // if (JSON.parse(localStorage.getItem(drill.UPGRADE_CAP_LOCAL_STORAGE_KEY)) = true) { 
  //   document.getElementById("drillSpeedUpgradeButton").remove();
  // }
  // useEffect(currency.save(money), [money]);
  // useEffect(miner.saveAmount(ownedMiners), [ownedMiners]);
  // useEffect(drill.saveAmount(ownedDrills), [ownedDrills]);
  const saveVariables = () => {
    miner.saveAmount(ownedMiners);
    drill.saveAmount(ownedDrills);
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
  const upgradeMinerSpeed = () => {
    if (!(money >= miner.speedUpgradeCost)) return;
    setMoney(money - miner.speedUpgradeCost);
    miner.speed = miner.speed - miner.speedUpgradeRate;
    miner.speedUpgradeCost += miner.speedUpgradeCost;
    if (!(miner.speed - miner.speedUpgradeRate <= 0)) return;
    localStorage.setItem(miner.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
    document.getElementById("minerSpeedUpgradeButton").remove();
  };
  const upgradeDrillSpeed = () => {
    if (!(money >= drill.speedUpgradeCost)) return;
    setMoney(money - drill.speedUpgradeCost);
    drill.speed = drill.speed - drill.speedUpgradeRate;
    drill.speedUpgradeCost += drill.speedUpgradeCost;
    if (!(drill.speed - drill.speedUpgradeRate <= 0)) return;
    localStorage.setItem(drill.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
    document.getElementById("drillSpeedUpgradeButton").remove();
  };
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
          Miner ({miner.cost * multiplier}M)
        </button>
        <button onClick={buyDrill}>
          Drill ({drill.cost * multiplier}M)
        </button>
      </div>
      <div id="upgradeContainer">
        <h2>Upgrade here:</h2>
        <button id="minerSpeedUpgradeButton" onClick={upgradeMinerSpeed}>
          Miner Speed (5,000M)
        </button>
        <button id="drillSpeedUpgradeButton" onClick={upgradeDrillSpeed}>
          Drill Speed (50,000M)
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
