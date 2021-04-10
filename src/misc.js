
class Worker {
  constructor(
    defaultCost,
    defaultProductionRate, 
    defaultProductionRateUpgradeCost, 
    name
    ) {
        
      // storage keys
      this.OWNED_LOCAL_STORAGE_KEY = `Coalminer.${name}Owned`;
      this.COST_LOCAL_STORAGE_KEY = `Coalminer.${name}Cost`;
      this.UPGRADE_CAP_LOCAL_STORAGE_KEY = `Coalminer.${name}CapLimit`;
      this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRate`;
      this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRateUpgradeCost`;
      this.saveFiles = [
        {
          key: this.OWNED_LOCAL_STORAGE_KEY,
          value: this.owned
        },
        {
          key: this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY,
          value: this.productionRate
        },
        {
          key: this.COST_LOCAL_STORAGE_KEY,
          value: this.cost
        },
        {
          key: this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY,
          value: this.productionRateUpgradeCost
        }
      ]
      this.name = name;
      this.owned = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || 0;
      this.cost = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultCost;
      this.productionRate = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRate;
      this.productionRateUpgradeCost = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || defaultProductionRateUpgradeCost;
    }
    save() {
      this.saveFiles.forEach(save => {
        localStorage.setItem(save.key, JSON.stringify(save.value))
      })
    }
}

const miners = new Worker(10, 1, 100, "Miner")
const drills = new Worker(100, 2, 1000, "Drill")
const Workers = [miners, drills]
export default Workers;
