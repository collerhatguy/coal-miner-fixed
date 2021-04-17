import React from 'react';
import Worker from "./Worker";
import Workers from "../misc";

export default function WorkerList({ money, setMoney, multiplier}) {
    return (
        <div id="worker-list">
            {Workers.map((worker, index) => {
                return <Worker worker={worker} money={money} setMoney={setMoney} multiplier={multiplier} key={index} />
            })}
        </div>
    )
}
