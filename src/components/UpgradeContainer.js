import React from 'react'

export default function UpgradeContainer(props) {

    return (
        <div id="upgradeContainer">
            <h2>Upgrade here:</h2>
            <button id="minerSpeedUpgradeButton" onClick={props.upgradeMinerSpeed}>
            Miner Speed ({props.miner.speedUpgradeCost}$)
            </button>
            <button id="drillSpeedUpgradeButton" onClick={props.upgradeDrillSpeed}>
            Drill Speed ({props.drill.speedUpgradeCost}$)
            </button>
        </div>
    )
}
