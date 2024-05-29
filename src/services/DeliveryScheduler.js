const Vehicle = require("../models/Vehicle");
const Package = require("../models/Package");

class DeliveryScheduler {
  constructor(vehicles) {
    this.vehicles = vehicles;
    this.scheduledPackages = [];
  }

  scheduleDeliveries(packages) {
    packages.sort((a, b) => b.weight - a.weight || a.distance - b.distance); // Heaviest and closest first

    while (packages.length > 0) {
      const vehicle = this.vehicles.reduce((a, b) =>
        a.availableAt < b.availableAt ? a : b
      );
      let load = 0;
      const tripPackages = [];

      while (
        packages.length > 0 &&
        load + packages[0].weight <= vehicle.maxWeight
      ) {
        const pkg = packages.shift();
        load += pkg.weight;
        tripPackages.push(pkg);
      }

      const maxDistance = Math.max(...tripPackages.map((pkg) => pkg.distance));
      const tripTime = maxDistance / vehicle.speed;
      const returnTime = tripTime;

      tripPackages.forEach((pkg) => {
        const deliveryTime = vehicle.availableAt + tripTime;
        this.scheduledPackages.push({
          id: pkg.id,
          deliveryTime: deliveryTime.toFixed(2),
        });
      });

      vehicle.availableAt += tripTime + returnTime;
    }

    return this.scheduledPackages;
  }
}

module.exports = DeliveryScheduler;
