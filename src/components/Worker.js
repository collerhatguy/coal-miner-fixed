import React, {useEffect} from 'react'

export default function Worker({worker, money, setMoney, multiplier}) {
    const buyWorker = (worker) => {
        // check if there is enough money
        const totalCost = worker.cost * multiplier;
        if (money < totalCost) return;
        // if there is subtract from funds
        setMoney(money - totalCost);
        // adjust the stats accoringly
        worker.setOwned(worker.owned + multiplier);
        worker.setCost(worker.cost + multiplier);
    };
    const miningWorker = (worker) => {
        setMoney(prevMoney => prevMoney + worker.owned * worker.productionRate);
    };
    useEffect(() => {
        setInterval(() => miningWorker(worker), 10000)
    })
    const upgradeWorkerSpeed = (worker) => {
        // check if we have enough money
        if (!(money >= worker.speedUpgradeCost)) return;
        // subtract cost from money 
        setMoney(money - worker.speedUpgradeCost);
        // apply upgrade based on built in rate
        worker.speed = worker.speed - worker.speedUpgradeRate;
        // increase cost of upgrade
        worker.speedUpgradeCost += worker.speedUpgradeCost;
        // save our current speed
        localStorage.setItem(worker.CURRENT_SPEED_LOCAL_STORAGE_KEY, JSON.stringify(worker.speed));
        // check if we have hit the upgrade limit
        if (!(worker.speed - worker.speedUpgradeRate <= 0)) return;
        // if we have than save that
        localStorage.setItem(worker.UPGRADE_CAP_LOCAL_STORAGE_KEY, JSON.stringify(true))
    };
    return (
        <div className="worker">
            <h2>{worker.name}</h2>
            <h2>Owned: {worker.owned}</h2>
            <h2>Cost: {worker.cost * multiplier}</h2>
            <button onClick={() => buyWorker(worker)}>Buy {multiplier}?</button>
        </div>
    )
}
