export const ACTIONS = {
    upgrade: "UpgradeWorker",
    buy: "BuyWorker",
}
export const upgrade = () => {
    return {
        type: ACTIONS.upgrade
    }
}
export const buy = (amount) => {
    return {
        type: ACTIONS.buy,
        payload: amount
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.upgrade:
            return {
                ...state,
                productionRate: state.productionRate + 1, 
                productionRateUpgradeCost: state.productionRateUpgradeCost * 2,
                level: state.level + 1, 
            }
        case ACTIONS.buy:
            return {
                ...state,
                owned: state.owned + action.payload,
                cost: state.cost + action.payload, 
            }
        default: return state;
    }
}
export default reducer;