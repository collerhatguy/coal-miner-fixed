import React from 'react'

export default function Acheivement({acheivement}) {
    return (
        <div
            style={acheivement.acheived ? {
                border: "green solid 2px"
            } : {
                border: "red solid 2px"
            }} 
            className="acheivement" >
            <h3>{acheivement.name}</h3>
            <p>{acheivement.requirements}</p>
            <span>Reward: {acheivement.reward}$</span>
        </div>
    )
}
