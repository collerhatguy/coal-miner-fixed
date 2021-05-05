import { useReducer, useEffect, useState, useCallback } from "react";

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
    const [state, dispatch] = useReducer(reducer, worker);
    const miningSpeed = 3000;
    const [progress, setProgress] = useState(0);
    const [lastMinedTime, setLastMinedTime] = useState();

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
        const mining = setInterval(() => {
            setMoney(prevMoney => prevMoney + (state.owned * state.productionRate));
            setLastMinedTime(Date.now());
            console.log(lastMinedTime);
        }, miningSpeed)
    }, [state])
    useEffect(() => {
        const progressSetting = setInterval(() => {
            setProgress(Math.floor((Date.now() - lastMinedTime) / miningSpeed))
        }, 1000)
    }, [])
    useEffect(() => {
        // console.log(progress, lastMinedTime);
    }, [progress, lastMinedTime])
    return [state, BuyWorker, UpgradeWorker, progress];
}