import React from 'react'


export default function UpgradeContainer({
    upgradeSpeed, 
    Miners,
    Drills 
    }) {
    const minerUpgradeBtn = document.getElementById("minerSpeedUpgradeButton");
    const drillUpgradeBtn = document.getElementById("drillSpeedUpgradeButton");
    return (
        <div id="upgradeContainer">
            <h2>Upgrade here:</h2>
            <button id="minerSpeedUpgradeButton" onClick={upgradeSpeed(Miners)}>
                Miner Speed ({Miners.speedUpgradeCost}$)
            </button>
            <button id="drillSpeedUpgradeButton" onClick={upgradeSpeed(Drills)}>
                Drill Speed ({Drills.speedUpgradeCost}$)
            </button>
        </div>
    )
}
