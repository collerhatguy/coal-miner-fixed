import React, {useEffect} from 'react';
import useWorker from "../hooks/useWorker";

export default function Worker({worker, money, setMoney, multiplier}) {
    const [ owned, setOwned, 
        cost, setCost, 
        productionRate, setProductionRate, 
        productionRateUpgradeCost, setProductionRateUpgradeCost] = useWorker(worker)
    const buyWorker = () => {
        // check if there is enough money
        const totalCost = cost * multiplier;
        if (money < totalCost) return;
        // if there is subtract from funds
        setMoney(prevMoney => prevMoney - totalCost);
        // adjust the stats accoringly
        setOwned(prevOwned => prevOwned + multiplier);
        setCost(prevCost => prevCost + multiplier);
    };
    const miningWorker = () => {
        setMoney(prevMoney => prevMoney + owned * productionRate);
    };
    const upgradeWorker = () => {
        if (productionRateUpgradeCost < money) return;
        setProductionRate(prevProductionRate => prevProductionRate + 1);
        setProductionRateUpgradeCost(prevProductionRateUpgradeCost => prevProductionRateUpgradeCost * 2);
    };
    useEffect(() => {
        worker.save();
    }, [worker])
    useEffect(() => {
        setInterval(() => miningWorker(worker), 10000)
    }, [])
    return (
        <div className="worker">
            <h2>{worker.name}</h2>
            <h2>Owned: <span>{owned}</span></h2>
            <h2>Cost: <span>{cost * multiplier}</span>$</h2>
            <h2>Upgrade Cost: <span>{productionRateUpgradeCost}</span>$</h2>
            <button onClick={() => buyWorker()}>Buy <span>{multiplier}</span>?</button>
            <button onClick={() => upgradeWorker()}>Upgrade?</button>
        </div>
    )
}
