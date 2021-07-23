import { useReducer, useEffect, useCallback, useState } from "react";

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
    const [state, dispatch] = useReducer(reducer, worker);
    const [lastMinedTime, setLastMinedTime] = useState(Date.now());
    const [progress, setProgress] = useState(0);
    
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
    
    const [miningTrigger, setMiningTrigger] = useState(0);
    const [progressTrigger, setProgressTrigger] = useState(0);
    useEffect(() => {
        // set up the triggers for useEffect mining
        // has to be done this whay b/c state doesnt update withen a set timmeout function
        setInterval(() => {
            setMiningTrigger(prevMining => prevMining + 1)
        }, state.speed)
        
        const progressSpeed = 100;
        setInterval(() => {
            setProgressTrigger(prevProgress => prevProgress + 1)
        }, progressSpeed)
    }, []);

    useEffect(() => {
        setMoney(prevMoney => prevMoney + state.owned * state.productionRate);
        setLastMinedTime(Date.now());
    }, [miningTrigger]);

    useEffect(() => {
        if (state.owned === 0) return;
        setProgress(Math.floor(((Date.now() - lastMinedTime) / state.speed) * 100));
    }, [progressTrigger])

    
    return [state, progress, BuyWorker, UpgradeWorker];
}