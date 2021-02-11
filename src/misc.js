import React from "react";
export const currency = {
    OWNED_LOCAL_STORAGE_KEY: "Coalminer.money",
    save: (money) => {
      localStorage.setItem("Coalminer.money", JSON.stringify(money));
    },
};
export class Worker extends React.Component {
  constructor(
    defaultCost,
    defaultProductionRate, 
    defaultProductionRateUpgradeCost, 
    name
    ) {
      // what should go in the super props?
      super()
      // all variables that change
      this.state = {
        owned: JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || 0,
        cost: JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultCost,
        productionRate: JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRate,
        productionRateUpgradeCost: JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRateUpgradeCost,
      }
      // storage keys
      this.OWNED_LOCAL_STORAGE_KEY = `Coalminer.${name}Owned`;
      this.COST_LOCAL_STORAGE_KEY = `Coalminer.${name}Cost`;
      this.UPGRADE_CAP_LOCAL_STORAGE_KEY = `Coalminer.${name}CapLimit`;
      this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRate`;
      this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRateUpgradeCost`;
      // set state functions
      this.setOwned = this.setOwned.bind(this);
      this.setCost = this.setCost.bind(this);
      this.setProductionRate = this.setProductionRate.bind(this);
      this.setProductionRateUpgradeCost = this.setProductionRateUpgradeCost.bind(this);
    }
    // for changing how much is owned
    setOwned(newOwned) {
      this.setState({
        owned: newOwned
      })
    }
    // for setting the cost
    setCost(newCost) {
      this.setState({
        cost: newCost
      })
    }
    // whatever value is passed to the function is the new production rate for this worker
    setProductionRate(newProductionRate) {
      this.setState({
        productionRate: newProductionRate
      })
    }
    // when you call this function double the cost of upgrading the production rate
    setProductionRateUpgradeCost() {
      this.setState({
        productionRateUpgradeCost: this.state.productionRateUpgradeCost * 2,
      })
    }
}