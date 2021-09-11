import { useState } from "react"
import useTimer from "./useTimer"

const useProgress = (speed) => {
    const [lastMinedTime, setLastMinedTime] = useState(Date.now());
    const [progress, setProgress] = useState(0);

    useTimer(80, () => {
        setProgress(Math.floor(((Date.now() - lastMinedTime) / speed) * 100));
    })

    const resetProgress = () => setLastMinedTime(Date.now()) 

    return [progress, resetProgress];
}

export default useProgress;