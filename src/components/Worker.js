import React from 'react'
import { useMultiplier } from '../hooks/useContext'
import useWorker from "../hooks/useWorker"
import useToggle from '../hooks/useToggle'
import PropTypes from "prop-types"


export default function Worker(props) {
    const { worker } = props
    const multiplier = useMultiplier()
    const [workerState, progress, affordable, BuyWorker, UpgradeWorker] = useWorker(worker, multiplier)
    
    const { owned, name, cost, level, productionRate, productionRateUpgradeCost, img } = workerState
    
    const [visible, toggleVisible] = useToggle(true)

    if (affordable) return (
        <div 
            className="worker"
            onClick={toggleVisible}
            data-cy="visibility-btn">
            <h3 className="worker-name">
                {name}
            </h3>
            {visible && <div 
                data-cy="visibility-pnl" 
                className="detail-container">
                <progress 
                    data-cy="progress" 
                    max={100} 
                    value={owned ? progress : 0} 
                />
                <button 
                    data-cy="buy" 
                    onClick={BuyWorker}
                >Buy 
                    <span>
                        {multiplier}
                    </span> 
                    for 
                    <span>
                        {cost * multiplier}
                    </span>
                    $?
                </button>
                <button onClick={UpgradeWorker}>
                    Upgrade for 
                    <span>
                        {productionRateUpgradeCost}
                    </span>
                    $?
                </button>
                <img 
                    className="worker-image" 
                    src={img} 
                    alt="woker img"
                />
                <h4>Owned: 
                    <span data-cy="owned">
                        {owned}
                    </span>
                </h4>
                <h4>Production Rate: 
                    <span>
                        {productionRate}
                    </span>
                    $
                </h4>
                <h4>Level: 
                    <span>
                        {level}
                    </span>
                </h4>
            </div>}
        </div>
    )
}
Worker.propTypes = {
    worker: PropTypes.shape({
        name: PropTypes.string,
        speed: PropTypes.number,
        owned: PropTypes.number,
        level: PropTypes.number,
        productionRate: PropTypes.number,
        productionRateUpgradeCost: PropTypes.number,
    })
}