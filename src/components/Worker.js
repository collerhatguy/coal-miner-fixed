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

    if (!affordable) return null
    return (
        <div 
            className="worker"
            data-cy="visibility-btn">
            <h3 
                onClick={toggleVisible}
                className="worker-name"
            >
                {name} 
                <span data-cy="owned">
                    {owned}
                </span>
            </h3>
            {visible && <div 
                data-cy="visibility-pnl" 
                className="detail-container">
                {owned !== 0 &&
                    <progress 
                        data-cy="progress" 
                        max={100} 
                        value={progress} 
                    />
                }
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
                <img 
                    className="worker-image" 
                    src={img} 
                    alt="woker img"
                />
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