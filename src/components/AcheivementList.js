import React, {useReducer} from 'react'
function reducer(state, action) {

}
const acheivements = [
    {
        name: "One of Each",
        acheived: false,
        requirements: "Get one of every worker"
    }
]
    
export default function AcheivementList() {
    const [state, dispatch] = useReducer(reducer, acheivements)
    return (
        <div id="acheivement-list">
            <div>
                Get one of every Worker
            </div>
        </div>
    )
}
