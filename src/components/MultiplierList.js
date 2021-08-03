import React from 'react';
import Multiplier from "./Multiplier";
import PropTypes from "prop-types";

export default function MultiplierList({setMultiplier}) {
    return (
        <div className="multiplier-container">
            <fieldset>
                <legend>Multipliers for buying in mass:</legend>
                <Multiplier amount={1} setMultiplier={setMultiplier} key="1" />
                <Multiplier amount={10} setMultiplier={setMultiplier} key="10" />
                <Multiplier amount={100} setMultiplier={setMultiplier} key="100" />
            </fieldset>
        </div>
    )
}
MultiplierList.propType = {
    setMultiplier: PropTypes.func.isRequired,
}
