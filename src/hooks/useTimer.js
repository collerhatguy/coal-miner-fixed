import { useEffect, useState } from 'react'

export default function useTimer(time, callback) {
    const [trigger, setTrigger] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setTrigger(prevTrigger => prevTrigger + 1)
        }, time)
    }, [])

    useEffect(callback, [trigger])
}
