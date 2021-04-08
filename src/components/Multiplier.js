import React from 'react'

export default function Multiplier({setMultiplier}) {
    return (
        <div id="multiplierContainer">
            <fieldset>
            <legend>Multipliers for buying in mass:</legend>
            <label for="1multiplier">1x</label>
            <input
                type="radio"
                value={1}
                id="1multiplier"
                name="multiplier"
                onClick={e => {setMultiplier(e.target.value)}}
            ></input>
            <label for="10multiplier">10x</label>
            <input
                type="radio"
                value={10}
                id="10multiplier"
                name="multiplier"
                onClick={e => {setMultiplier(e.target.value)}}
            ></input>
            <label for="100multiplier">100x</label>
            <input
                type="radio"
                value={100}
                id="100multiplier"
                name="multiplier"
                onClick={e => {setMultiplier(e.target.value)}}
            ></input>
            </fieldset>
        </div>
    )
}
