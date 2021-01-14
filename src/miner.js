export const miner = {
    cost: 10,
    speed: 10000,
    speedUpgradeCost: 5000,
    speedUpgradeRate: 100,
    OWNED_LOCAL_STORAGE_KEY: "Coalminer.ownedMiners",
    UPGRADE_CAP_LOCAL_STORAGE_KEY: "Coalminer.minerCapLimit",
    // speedUpgradeCap: localStorage.getItem(this.UPGRADE_CAP_LOCAL_STORAGE_KEY) || false,
    saveAmount: (ownedDrills) => {
      localStorage.setItem(
        "Coalminer.ownedMiners",
        JSON.stringify(ownedDrills)
      );
    },
  };
  