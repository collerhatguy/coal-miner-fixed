import {useEffect, useState} from "react";
// take worker and returns a usestate form of the workers rendered variables
function useWorker(worker) {
    const [owned, setOwned] = useState(worker.owned);
    useEffect(() => {
        worker.save()
    }, [owned])
}