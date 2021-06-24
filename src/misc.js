import drillImg from "./images/drill.png";
import workerImg from "./images/worker.png";
import monkeyImg from "./images/monky.png";
class Worker {
  constructor({
    defaultCost,
    defaultProductionRate, 
    defaultProductionRateUpgradeCost, 
    name,
    img,
    miningSpeed
  }) {
        
      // storage keys
      this.OWNED_LOCAL_STORAGE_KEY = `Coalminer.${name}Owned`;
      this.COST_LOCAL_STORAGE_KEY = `Coalminer.${name}Cost`;
      this.UPGRADE_CAP_LOCAL_STORAGE_KEY = `Coalminer.${name}CapLimit`;
      this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRate`;
      this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentProductionRateUpgradeCost`;
      
      this.name = name;
      this.owned = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || 0;
      this.cost =  JSON.parse(localStorage.getItem(this.COST_LOCAL_STORAGE_KEY)) || defaultCost;
      this.productionRate = JSON.parse(localStorage.getItem(this.CURRENT_PPRODUCTION_RATE_LOCAL_STORAGE_KEY)) || defaultProductionRate;
      this.productionRateUpgradeCost = JSON.parse(localStorage.getItem(this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY)) || defaultProductionRateUpgradeCost;
      this.level = 0;
      this.img = img;
      this.speed = miningSpeed;
      this.saveFiles = [
        {
          key: this.OWNED_LOCAL_STORAGE_KEY,
          value: this.owned
        },
        {
          key: this.COST_LOCAL_STORAGE_KEY,
          value: this.cost
        },
        {
          key: this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY,
          value: this.productionRate
        },
        {
          key: this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY,
          value: this.productionRateUpgradeCost
        }
      ]
    }
    
    save() {
      this.saveFiles.forEach(save => {
        localStorage.setItem(save.key, JSON.stringify(save.value))
      })
    }
}

const miners = new Worker({
  defaultCost: 10,
  defaultProductionRate: 1, 
  defaultProductionRateUpgradeCost: 30, 
  name: "Miners",
  img: workerImg,
  miningSpeed: 3000,
});
const drills = new Worker({
  defaultCost: 50,
  defaultProductionRate: 10, 
  defaultProductionRateUpgradeCost: 100, 
  name: "Drills",
  img: drillImg,
  miningSpeed: 2000,
});
const monkeyMiners = new Worker({
  defaultCost: 100,
  defaultProductionRate: 20, 
  defaultProductionRateUpgradeCost: 300, 
  name: "Monkey Miners",
  img: monkeyImg,
  miningSpeed: 1000,
})
const Workers = [miners, drills, monkeyMiners]
export default Workers;
