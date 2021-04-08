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
    const upgradeWorker = (worker) => {
        if (worker.productionRateUpgradeCost < money) return;
        worker.setProductionRate(worker.productionRate + 1);
        worker.setProductionRateUpgradeCost(worker.productionRateUpgradeCost * 2);
    };
    useEffect(() => {
        localStorage.setItem(worker.OWNED_LOCAL_STORAGE_KEY, JSON.stringify(worker.owned))
        localStorage.setItem(worker.COST_LOCAL_STORAGE_KEY, JSON.stringify(worker.cost))
        localStorage.setItem(worker.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY, JSON.stringify(worker.productionRate))
        localStorage.setItem(worker.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY, JSON.stringify(worker.productionRateUpgradeCost))
    }, [worker.cost, worker.owned, worker.productionRate, worker.productionRateUpgradeCost])
    useEffect(() => {
        setInterval(() => miningWorker(worker), 10000)
    }, [])
    return (
        <div className="worker">
            <h2>{worker.name}</h2>
            <h2>Owned: <span>{worker.owned}</span></h2>
            <h2>Cost: <span>{worker.cost * multiplier}</span>$</h2>
            <h2>Upgrade Cost: <span>{worker.productionRateUpgradeCost}</span>$</h2>
            <button onClick={() => buyWorker(worker)}>Buy <span>{multiplier}</span>?</button>
            <button onClick={() => upgradeWorker(worker)}>Upgrade?</button>
        </div>
    )
}
