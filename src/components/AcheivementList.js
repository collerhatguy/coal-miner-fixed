import React, {useReducer} from 'react';
import Acheivement from "./Acheivement";
function reducer(state, action) {

}
const acheivements = [
    {
        name: "One of Each",
        acheived: false,
        requirements: "Get one of every worker",
        reward: 100,
    }
]
    
export default function AcheivementList() {
    const [state, dispatch] = useReducer(reducer, acheivements)
    return (
        <div id="acheivement-list">
            <h2>Acheivements</h2>
            {acheivements.map(acheivement => {
                return <Acheivement acheivement={acheivement} />
            })}
        </div>
    )
}
