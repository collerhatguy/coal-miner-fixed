import React, {useState, useEffect} from 'react';
import useWorker from "../hooks/useWorker";


export default function Worker({worker, money, setMoney, multiplier}) {
    const [workerState, progress, BuyWorker, UpgradeWorker] = useWorker(worker, setMoney, money, multiplier);
    const [affordable, setAffordable] = useState(false)
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        if (worker.cost <= money) setAffordable(true); 
    }, [money])
    return (
        <div className={`worker ${affordable ? "" : "unaffordable"}`}>
            <h3 className="worker-name">{workerState.name}</h3>
            <div>
                <button tabIndex="0"
                    data-cy="visibility-btn"
                    onClick={() => setVisible(!visible)}>
                    {visible ? "Hide" : "Show"}?
                </button>
            </div>
            {visible ? <div data-cy="visibility-pnl" className="visible">
                <progress data-cy="progress" max={100} value={progress} />
                <img className="worker-image" 
                    src={workerState.img} />
                <h4>Owned: <span data-cy="owned">{workerState.owned}</span></h4>
                <h4>Cost: <span>{workerState.cost * multiplier}</span>$</h4>
                <h4>Production Rate: <span>{workerState.productionRate}</span>$</h4>
                <h4>Upgrade Cost: <span>{workerState.productionRateUpgradeCost}</span>$</h4>
                <h4>Level: <span>{workerState.level}</span></h4>
                <button data-cy="buy" onClick={() => BuyWorker()}>Buy <span>{multiplier}</span>?</button>
                <button onClick={() => UpgradeWorker()}>Upgrade?</button>
            </div> : null}
        </div>
    )
}
