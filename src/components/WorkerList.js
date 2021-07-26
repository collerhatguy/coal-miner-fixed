import React from 'react';
import Worker from "./Worker";
import Workers from "../misc";

export default function WorkerList({ multiplier}) {
    return (
        <ul class="worker-list">
            {Workers.map((worker, index) => 
                <Worker 
                    worker={worker} 
                    multiplier={multiplier} 
                    key={index} 
                />
            )}
        </ul>
    )
}
