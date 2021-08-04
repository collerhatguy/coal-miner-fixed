import { useState, useEffect, useLayoutEffect } from "react";

const useProgress = (speed) => {
    const [progressTrigger, setProgressTrigger] = useState(0);
    const [lastMinedTime, setLastMinedTime] = useState(Date.now());
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        
        const progressSpeed = 80;
        setInterval(() => {
            setProgressTrigger(prevProgress => prevProgress + 1)
        }, progressSpeed)
    }, []);

    useLayoutEffect(() => {
        // calculate how much time past in percentage since we last mined
        setProgress(Math.floor(((Date.now() - lastMinedTime) / speed) * 100));
    }, [progressTrigger])

    const resetProgress = () => setLastMinedTime(Date.now()) 

    return [progress, resetProgress];
}

export default useProgress;