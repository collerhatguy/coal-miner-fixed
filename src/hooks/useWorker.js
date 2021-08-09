import { useReducer, useEffect, useCallback, useState } from "react";
import { useMoney } from "./useContext";
import reducer, { upgrade, buy } from "../reducers";
import useProgress from "./useProgress";

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
        dispatch(buy(multiplier))
    }, [state, multiplier, money])
    
    const UpgradeWorker = useCallback(() => {
        if (money < state.productionRateUpgradeCost) return;
        setMoney(prevMoney => prevMoney - state.productionRateUpgradeCost);
        dispatch(upgrade())
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