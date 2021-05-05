import React, {useState, useEffect} from 'react';
import useVisible from "../hooks/useVisible";
import useWorker from "../hooks/useWorker";


export default function Worker({worker, money, setMoney, multiplier}) {
    const [workerVisibility, reveal] = useVisible();
    const [workerState, BuyWorker, UpgradeWorker, progress] = useWorker(worker, setMoney, money, multiplier);
    const [affordable, setAffordable] = useState(false);
    useEffect(() => {
        if (worker.cost <= money) setAffordable(true); 
    }, [money])
    return (
        <div className={affordable ? "worker" : "unaffordable"}
            >
            <h2 className="worker-name">{workerState.name}</h2>
             <div
                ref={workerVisibility} 
                >
                <h2>Owned: <span>{workerState.owned}</span></h2>
                <h2>Cost: <span>{workerState.cost * multiplier}</span>$</h2>
                <h2>Production Rate: <span>{workerState.productionRate}</span>$</h2>
                <h2>Upgrade Cost: <span>{workerState.productionRateUpgradeCost}</span></h2>
                <progress value={progress} max="100"></progress>
                <button onClick={() => BuyWorker()}>Buy <span>{multiplier}</span>?</button>
                <button onClick={() => UpgradeWorker()}>Upgrade?</button>
            </div>
            <div>
                <button 
                    tabIndex="0"
                    onClick={() => reveal()}
                >
                    Visibility
                </button>
            </div>
        </div>
    )
}
