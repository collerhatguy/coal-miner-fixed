import React from 'react'

export default function Multiplier({amount, setMultiplier}) {
    return (
        <label for={`${amount}-multiplier`}>{amount}x
            <input
                type="radio"
                value={amount}
                id={`${amount}-multiplier`}
                name="multiplier"
                onClick={() => {setMultiplier(amount)}}
            ></input>
        </label>
    )
}
