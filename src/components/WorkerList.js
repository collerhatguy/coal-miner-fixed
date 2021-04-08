import React from 'react'
import Worker from "./Worker";

export default function WorkerList({workers, money, setMoney, multiplier}) {
    return (
        <div id="worker-list">
            {workers.map(worker => {
                return <Worker worker={worker} money={money} setMoney={setMoney} multiplier={multiplier} />
            })}
        </div>
    )
}
