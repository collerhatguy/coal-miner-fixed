import React, {useState, useEffect} from 'react';
import useWorker from "../hooks/useWorker";
const miningSpeed = 10000;

export default function Worker({worker, money, setMoney, multiplier}) {
    // takes all of our properties and converts them to use state for display to user
    const [ 
        owned, setOwned, 
        cost, setCost, 
        productionRate, setProductionRate, 
        productionRateUpgradeCost, setProductionRateUpgradeCost] = useWorker(worker)
    // represents the value of our progress bar
    const [progress, setProgress] = useState(1);
    // represents the time of our last mine
    const [timeSinceLastMining, setTimeSinceLastMining] = useState(Date.now());
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
        if (productionRateUpgradeCost > money) return;
        setProductionRate(prevProductionRate => prevProductionRate + 1);
        setProductionRateUpgradeCost(prevProductionRateUpgradeCost => prevProductionRateUpgradeCost * 2);
    };
    // this is for adding to our money every so often
    useEffect(() => {
        setInterval(() => {
            miningWorker()
            setProgress(1)
            setTimeSinceLastMining(Date.now())
        }, miningSpeed)
    }, [owned])
    // this is for updating our progress bar
    useEffect(() => {
        setInterval(() => {
            // the current time minus the time that we last comleted a mine, divided by time it takes to mine
            const percentage = ((Date.now() - timeSinceLastMining) / miningSpeed);
            setProgress(percentage * 100);
        }, 500)
    }, [])

    return (
        <div className="worker">
            <h2>{worker.name}</h2>
            <h2>Owned: <span>{owned}</span></h2>
            <progress value={`${progress}`} max="100"></progress>
            <h2>Cost: <span>{cost * multiplier}</span>$</h2>
            <h2>Production Rate <span>{productionRate}</span></h2>
            <h2>Upgrade Cost: <span>{productionRateUpgradeCost}</span>$</h2>
            <button onClick={() => buyWorker()}>Buy <span>{multiplier}</span>?</button>
            <button onClick={() => upgradeWorker()}>Upgrade?</button>
        </div>
    )
}
