
class Worker {
  constructor(
    defaultCost,
    defaultProductionRate, 
    defaultProductionRateUpgradeCost, 
    name
    ) {
      this.name = name;
      this.owned = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || 0;
      this.cost = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultCost;
      this.productionRate = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRate;
      this.productionRateUpgradeCost = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRateUpgradeCost;
  
      // storage keys
      this.OWNED_LOCAL_STORAGE_KEY = `Coalminer.${name}Owned`;
      this.COST_LOCAL_STORAGE_KEY = `Coalminer.${name}Cost`;
      this.UPGRADE_CAP_LOCAL_STORAGE_KEY = `Coalminer.${name}CapLimit`;
      this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRate`;
      this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRateUpgradeCost`;
    }
    // for changing how much is owned
    setOwned(newOwned) {
      this.owned = newOwned
    }
    // for setting the cost
    setCost(newCost) {
      this.cost = newCost
    }
    // whatever value is passed to the function is the new production rate for this worker
    setProductionRate(newProductionRate) {
      this.productionRate = newProductionRate
    }
    // when you call this function double the cost of upgrading the production rate
    setProductionRateUpgradeCost() {
      this.productionRateUpgradeCost = this.productionRateUpgradeCost * 2
    }
}

const miners = new Worker(10, 1, 100, "Miner")
const drills = new Worker(100, 2, 1000, "Drill")
const Workers = [miners, drills]
export default Workers;