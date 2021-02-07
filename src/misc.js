export const currency = {
    OWNED_LOCAL_STORAGE_KEY: "Coalminer.money",
    save: (money) => {
      localStorage.setItem("Coalminer.money", JSON.stringify(money));
    },
  };
export class Item {
  constructor(
    cost, 
    speed, 
    speedUpgradeCost, 
    speedUpgradeRate,
    productionRate, 
    name
    ) {
      this.cost = cost;
      this.speed = speed;
      this.speedUpgradeCost = speedUpgradeCost;
      this.speedUpgradeRate = speedUpgradeRate;
      this.productionRate = productionRate;
      this.OWNED_LOCAL_STORAGE_KEY = `Coalminer.${name}Owned`;
      this.UPGRADE_CAP_LOCAL_STORAGE_KEY = `Coalminer.${name}CapLimit`;
      this.CURRENT_SPEED_LOCAL_STORAGE_KEY = `Coalminer.${name}CurrentSpeed`;
      this.owned = JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY)) || 0;
    }
}