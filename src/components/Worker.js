import React, {useState, useEffect} from 'react';
import useWorker from "../hooks/useWorker";


export default function Worker({worker, money, setMoney, multiplier}) {
    const [workerState, progress, BuyWorker, UpgradeWorker] = useWorker(worker, setMoney, money, multiplier);
    const [affordable, setAffordable] = useState(false)
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        if (worker.cost <= money) setAffordable(true); 
    }, [money])
    const buy = e => {
        e.stopPropagation()
        BuyWorker()
    }
    const upgrade = e => {
        e.stopPropagation()
        UpgradeWorker()
    }
    return (
        <div 
            className={`worker ${affordable ? "" : "unaffordable"}`}
            onClick={() => setVisible(!visible)}
            data-cy="visibility-btn">
            <h3 className="worker-name">{workerState.name}</h3>
            {visible ? <div data-cy="visibility-pnl" className="visible">
                <progress data-cy="progress" max={100} value={progress} />
                <button 
                    data-cy="buy" 
                    onClick={buy}
                >Buy <span>{multiplier}</span> for <span>{workerState.cost * multiplier}</span>$?</button>
                <button 
                    onClick={upgrade}
                >Upgrade for <span>{workerState.productionRateUpgradeCost}</span>$?</button>
                <img className="worker-image" 
                    src={workerState.img} />
                <h4>Owned: <span data-cy="owned">{workerState.owned}</span></h4>
                <h4>Production Rate: <span>{workerState.productionRate}</span>$</h4>
                <h4>Level: <span>{workerState.level}</span></h4>
            </div> : null}
        </div>
    )
}
