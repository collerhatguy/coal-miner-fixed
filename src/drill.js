export const drill = {
    cost: 1000,
    speed: 1000,
    speedUpgradeCost: 10000,
    speedUpgradeRate: 200,
    OWNED_LOCAL_STORAGE_KEY: "Coalminer.ownedDrills",
    UPGRADE_CAP_LOCAL_STORAGE_KEY: "Coalminer.drillMaxLimit",
  
    saveAmount: function (ownedDrills) {
      localStorage.setItem(
        this.OWNED_LOCAL_STORAGE_KEY,
        JSON.stringify(ownedDrills)
      );
    },
  };
  