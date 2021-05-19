import React from 'react';
import Acheivement from "./Acheivement";

const acheivements = [
    {
        name: "One of Each",
        acheived: false,
        requirements: "Get one of every worker",
        reward: 100,
    }
]
    
export default function AcheivementList() {
    return (
        <div id="acheivement-container">
            <h2>Acheivements</h2>
            <div id="acheivement-list">
                {acheivements.map(acheivement => {
                    return <Acheivement acheivement={acheivement} />
                })}
            </div>
        </div>
    )
}
