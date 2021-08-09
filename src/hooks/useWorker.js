import { useReducer, useEffect, useCallback, useState } from "react";
import { useMoney } from "./useContext";
import useProgress from "./useProgress";

const ACTIONS = {
    Upgrade: "UpgradeWorker",
    Buy: "BuyWorker",
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

    useEffect(() => {
        setInterval(() => {
            setMiningTrigger(prevMining => prevMining + 1)
        }, state.speed)
    }, [])
    const [progress, resetProgress] = useProgress(state.speed);

    useEffect(() => {
        setMoney(prevMoney => prevMoney + state.owned * state.productionRate);
        resetProgress();
    }, [miningTrigger]);


    
    return [state, progress, affordable, BuyWorker, UpgradeWorker];
}