import React, {useEffect, useState, useReducer} from 'react';
const ACTIONS = {
    Upgrade: "UpgradeWorker",
    Buy: "BuyWorker",
    Mining: "MiningWorker",
}
function reducer(state, action, payload) {
    switch(action) {
        case ACTIONS.Upgrade:
            return {
                ...state,
                productionRate: this.productionRate + 1, 
            }
        case ACTIONS.Buy:
            return {
                ...state,
                owned: this.owned + payload.amount, 
            }
        case ACTIONS.Mining:
            // Mining function
        default: return state
    }
}

export default function Worker({worker, money, setMoney, multiplier}) {
    // set default state to worker and pass reducer function
    const [state, dispatch] = useReducer(reducer, worker);
    const miningSpeed = 10000;
    const [visible, setVisible] = useState(true);
    const reveal = () => {
        setVisible(prevVisible => !prevVisible)
    }
    return (
        <div className="worker">
            <h2 className="worker-name">{state.name}</h2>
            {/* <div className={ visible ? "visible" : "hidden"}>
                <h2>Owned: <span>{owned}</span></h2>
                <h2>Cost: <span>{cost * multiplier}</span>$</h2>
                <h2>Production Rate: <span>{productionRate}</span>$</h2>
                <h2>Upgrade Cost: <span>{productionRateUpgradeCost}</span></h2>
                <button onClick={() => buyWorker()}>Buy <span>{multiplier}</span>?</button>
                <button onClick={() => upgradeWorker()}>Upgrade?</button>
            </div> */}
            <div>
                <button 
                    tabIndex="0"
                    style={{
                        display: visible ? "block" : "none",
                    }}
                    onClick={() => reveal()}
                >
                    Minimize
                </button>
                <button 
                    tabIndex="0"
                    style={{
                        display: visible ? "none" : "block",
                    }}
                    onClick={() => reveal()}
                >
                    Reveal
                </button>
            </div>
        </div>
    )
}
