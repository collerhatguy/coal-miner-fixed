import React, {useEffect, useState} from 'react';
import useWorker from "../hooks/useWorker";

export default function Worker({worker, money, setMoney, multiplier}) {
    const miningSpeed = 10000;
    const [visible, setVisible] = useState(true);
    const [ 
        owned, setOwned, 
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
    // upgrade the workers production rate
    const upgradeWorker = () => {
        if (productionRateUpgradeCost > money) return;
        setMoney(prevMoney => prevMoney - productionRateUpgradeCost);
        setProductionRate(prevProductionRate => prevProductionRate + 1);
        setProductionRateUpgradeCost(prevProductionRateUpgradeCost => prevProductionRateUpgradeCost * 2);
    };
    // the functoin for whenever our worker mines
    const miningWorker = () => {
        setMoney(prevMoney => prevMoney + owned * productionRate);
    };
    // restart the mining function whenever we buy another miner
    useEffect(() => {
        setInterval(() => miningWorker(worker), miningSpeed)
    }, [owned])
    const reveal = () => {
        setVisible(prevVisible => !prevVisible)
    }
    return (
        <div className="worker">
            <div className={ visible ? "visible" : "hidden"}>
                <h2 className="worker-name">{worker.name}</h2>
                <h2>Owned: <span>{owned}</span></h2>
                <h2>Cost: <span>{cost * multiplier}</span>$</h2>
                <h2>Production Rate: <span>{productionRate}</span>$</h2>
                <h2>Upgrade Cost: <span>{productionRateUpgradeCost}</span></h2>
                <button onClick={() => buyWorker()}>Buy <span>{multiplier}</span>?</button>
                <button onClick={() => upgradeWorker()}>Upgrade?</button>
            </div>
            <div>
                <button style={{
                    display: visible ? "block" : "none",
                }}
                onClick={() => reveal()}>Reveal</button>
                <button style={{
                    display: visible ? "none" : "block",
                }}
                onClick={() => reveal()}>Minimize</button>
            </div>
        </div>
    )
}
