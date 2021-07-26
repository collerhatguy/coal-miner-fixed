import { useReducer, useEffect, useLayoutEffect, useCallback, useState } from "react";
import { useMoney } from "./useContext";

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
export default function useWorker(worker, multiplier) {
    const [state, dispatch] = useReducer(reducer, worker);
    const [money, setMoney] = useMoney();
    
    const [affordable, setAffordable] = useState(false)
    useEffect(() => {
        if (worker.cost <= money) setAffordable(true); 
    }, [money])

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
    const [lastMinedTime, setLastMinedTime] = useState(Date.now());
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        // set up the triggers for useEffect mining
        // has to be done this whay b/c state doesnt update withen a set timmeout function
        setInterval(() => {
            setMiningTrigger(prevMining => prevMining + 1)
        }, state.speed)
        
        const progressSpeed = 80;
        setInterval(() => {
            setProgressTrigger(prevProgress => prevProgress + 1)
        }, progressSpeed)
    }, []);

    useEffect(() => {
        setMoney(prevMoney => prevMoney + state.owned * state.productionRate);
        // reset the time that we last mined
        setLastMinedTime(Date.now());
    }, [miningTrigger]);

    useLayoutEffect(() => {
        if (state.owned === 0) return;
        // calculate how much time past in percentage since we last mined
        setProgress(Math.floor(((Date.now() - lastMinedTime) / state.speed) * 100));
    }, [progressTrigger])

    
    return [state, progress, affordable, BuyWorker, UpgradeWorker];
}