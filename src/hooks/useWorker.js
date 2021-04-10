import {useEffect, useState} from "react";
// take worker and returns a usestate form of the workers rendered variables
export default function useWorker(worker) {
    const [owned, setOwned] = useState(worker.owned);
    const [productionRate, setProductionRate] = useState(worker.productionRate);
    const [productionRateUpgradeCost, setProductionRateUpgradeCost] = useState(worker.productionRateUpgradeCost);
    const [cost, setCost] = useState(worker.cost);
    useEffect(() => {
        worker.save()
    }, [owned, cost, productionRate, productionRateUpgradeCost])
    return [owned, setOwned, cost, setCost, productionRate, setProductionRate, productionRateUpgradeCost, setProductionRateUpgradeCost]
}