import React, {useEffect, useReducer, useCallback} from 'react';
import useVisible from "../hooks/useVisible";

const ACTIONS = {
    Upgrade: "UpgradeWorker",
    Buy: "BuyWorker",
    Mining: "MiningWorker",
}
function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.Upgrade:
            return {
                ...state,
                productionRate: state.productionRate + 1, 
                productionRateCost: state.productionRateCost * 2, 
            }
        case ACTIONS.Buy:
            return {
                ...state,
                owned: state.owned + action.payload,
                cost: state.cost + action.payload, 
            }
        case ACTIONS.Mining:
            // 
            return {
                ...state,
            }
        default: return state
    }
}

export default function Worker({worker, money, setMoney, multiplier}) {
    // set default state to worker and pass reducer function
    const [state, dispatch] = useReducer(reducer, worker);
    const [workerVisibility, reveal] = useVisible();
    const miningSpeed = 3000;


    const BuyWorker = useCallback(() => {
        const totalCost = state.cost * multiplier;
        if (money < totalCost) return;
        setMoney(prevMoney => prevMoney - totalCost);
        dispatch({type: ACTIONS.Buy, payload: multiplier})
    }, [state, multiplier, money])

    const UpgradeWorker = useCallback(() => {
        if (money < state.productionRateUpgradeCost) return;
        setMoney(prevMoney => prevMoney - state.productionRateUpgradeCost);
        dispatch({type: ACTIONS.Upgrade})
    }, [state, money])

    useEffect(() => {
        setInterval(() => {
            setMoney(prevMoney => prevMoney + (state.owned * state.productionRate))
        }, miningSpeed)
    }, [state, money])
    return (
        <div className="worker">
            <h2 className="worker-name">{state.name}</h2>
             <div
                ref={workerVisibility} 
                >
                <h2>Owned: <span>{state.owned}</span></h2>
                <h2>Cost: <span>{state.cost * multiplier}</span>$</h2>
                <h2>Production Rate: <span>{state.productionRate}</span>$</h2>
                <h2>Upgrade Cost: <span>{state.productionRateUpgradeCost}</span></h2>
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
