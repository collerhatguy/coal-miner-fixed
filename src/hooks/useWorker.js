import { useReducer, useEffect, useCallback } from "react";

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
                productionRateUpgradeCost: state.productionRateUpgradeCost * 2,
                level: state.level + 1, 
            }
        case ACTIONS.Buy:
            return {
                ...state,
                owned: state.owned + action.payload,
                cost: state.cost + action.payload, 
            }
        default: return state;
    }
}
export default function useWorker(worker, setMoney, money, multiplier) {
    const [state, dispatch] = useReducer(reducer, {...worker, level: 0});
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
        console.log("mining")
        setInterval(() => {
            console.log("mined")
            console.log(state.owned )
            setMoney(prevMoney => prevMoney + (state.owned * state.productionRate))
        }, miningSpeed)
    }, [state])
    return [state, BuyWorker, UpgradeWorker];
}