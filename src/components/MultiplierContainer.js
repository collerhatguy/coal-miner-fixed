import React from 'react'

export default function MultiplierContainer({changeMultiplier}) {
    
    return (
        <div id="multiplierContainer">
            <fieldset>
                <legend>Multipliers for buying in mass:</legend>
                <label for="1multiplier">1x</label>
                <input
                    type="radio"
                    value="1"
                    id="1multiplier"
                    name="multiplier"
                    onClick={changeMultiplier(1)}
                ></input>
                <label for="10multiplier">10x</label>
                <input
                    type="radio"
                    value="10"
                    id="10multiplier"
                    name="multiplier"
                    onClick={changeMultiplier(10)}
                ></input>
                <label for="100multiplier">100x</label>
                <input
                    type="radio"
                    value="100"
                    id="100multiplier"
                    name="multiplier"
                    onClick={changeMultiplier(100)}
                ></input>
            </fieldset>
        </div>
    )
}
