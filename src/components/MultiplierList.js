import React from 'react'
import Multiplier from "./Multiplier";

export default function MultiplierList({setMultiplier}) {
    return (
        <section id="multiplierContainer">
            <fieldset>
                <legend>Multipliers for buying in mass:</legend>
                <Multiplier amount={1} setMultiplier={setMultiplier} key="1" />
                <Multiplier amount={10} setMultiplier={setMultiplier} key="10" />
                <Multiplier amount={100} setMultiplier={setMultiplier} key="100" />
            </fieldset>
        </section>
    )
}
