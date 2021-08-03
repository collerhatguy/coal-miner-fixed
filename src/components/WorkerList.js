import React from 'react';
import Worker from "./Worker";
import Workers from "../misc";
import PropTypes from "prop-types";

export default function WorkerList({ multiplier}) {
    return (
        <ul className="worker-list">
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
WorkerList.propTypes = {
    multiplier: PropTypes.oneOf([1, 10, 100])
}