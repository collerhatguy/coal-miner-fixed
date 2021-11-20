import { useReducer, useEffect, useCallback, useState } from "react";
import { useMoney } from "./useContext";
import reducer, { upgrade, buy } from "../reducers";
import useProgress from "./useProgress";
import useTimer from "./useTimer"

export default function useWorker(worker, multiplier) {
    const [state, dispatch] = useReducer(reducer, worker);
    const { 
        cost,
        owned, 
        speed,
        productionRateUpgradeCost: prUpgradeCost, 
        productionRate
    } = state
    
    const [money, setMoney] = useMoney();
    
    const [affordable, setAffordable] = useState(false)
    const [upgradeAffordable, setUgAffordable] = useState(false)

    useEffect(() => {
        if (cost <= money) setAffordable(true); 
        if (prUpgradeCost <= money) setUgAffordable(true); 
    }, [money])

    const BuyWorker = useCallback(event => {
        event.stopPropagation()
        const totalCost = cost * multiplier;
        if (money < totalCost) return;
        setMoney(prevMoney => prevMoney - totalCost);
        dispatch(buy(multiplier))
    }, [state, multiplier, money])
    
    const UpgradeWorker = useCallback(event => {
        event.stopPropagation()
        if (money < prUpgradeCost) return;
        setMoney(prevMoney => prevMoney - prUpgradeCost);
        dispatch(upgrade())
    }, [state, money])

    const [progress, resetProgress] = useProgress(speed);
    
    useTimer(speed, () => {
        setMoney(prevMoney => prevMoney + owned * productionRate);
        resetProgress();
    })
    
    return [state, progress, affordable, upgradeAffordable, BuyWorker, UpgradeWorker];
}