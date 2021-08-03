import React from 'react'

export default function Multiplier({amount, setMultiplier}) {
    return (
        <label htmlFor={`${amount}-multiplier`}>
            {amount}x
            <input
                data-cy="multiplier"
                type="radio"
                value={amount}
                id={`${amount}-multiplier`}
                name="multiplier"
                onClick={() => {setMultiplier(amount)}}
            ></input>
        </label>
    )
}
