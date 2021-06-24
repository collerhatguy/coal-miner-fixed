import React, {useState, useEffect} from 'react';
import useVisible from "../hooks/useVisible";
import useWorker from "../hooks/useWorker";


export default function Worker({worker, money, setMoney, multiplier}) {
    const [workerVisibility, visible, reveal] = useVisible();
    const [workerState, progress, BuyWorker, UpgradeWorker] = useWorker(worker, setMoney, money, multiplier);
    const [affordable, setAffordable] = useState(false)
    useEffect(() => {
        if (worker.cost <= money) setAffordable(true); 
    }, [money])
    return (
        <div className={`worker ${affordable ? "" : "unaffordable"}`}
            >
            <h3 className="worker-name">{workerState.name}</h3>
             <div
                ref={workerVisibility} 
                >
                <img
                    className="worker-image" 
                    src={workerState.img} />
                <h4>Owned: <span>{workerState.owned}</span></h4>
                <h4>Cost: <span>{workerState.cost * multiplier}</span>$</h4>
                <h4>Production Rate: <span>{workerState.productionRate}</span>$</h4>
                <h4>Upgrade Cost: <span>{workerState.productionRateUpgradeCost}</span>$</h4>
                <h4>Level: <span>{workerState.level}</span></h4>
                <progress max={100} value={progress} />
                <button onClick={() => BuyWorker()}>Buy <span>{multiplier}</span>?</button>
                <button onClick={() => UpgradeWorker()}>Upgrade?</button>
            </div>
            <div>
                <button 
                    tabIndex="0"
                    onClick={() => reveal()}
                >
                    {visible ? "Hide?" : "Reveal?"}
                </button>
            </div>
        </div>
    )
}
