import React from 'react';
import Worker from "./Worker";
import Workers from "../misc";

export default function WorkerList() {
    return (
        <ul className="worker-list">
            {Workers.map((worker, index) => 
                <Worker 
                    worker={worker}
                    key={index} 
                />
            )}
        </ul>
    )
}