import React from 'react'

export default function DisplayContainer({money, OwnedMiners, OwnedDrills}) {
    return (
        <div id="display">
            <h2>Money: {money}</h2>
            <h2>Miners: {OwnedMiners}</h2>
            <h2>Drills: {OwnedDrills}</h2>
        </div>
    )
}
