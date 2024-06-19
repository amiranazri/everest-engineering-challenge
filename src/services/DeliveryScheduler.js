class DeliveryScheduler {
  constructor(vehicles) {
    this.vehicles = vehicles;
    this.scheduledPackages = [];
  }

  getCombinations(packages, maxWeight) {
    const results = [];

    const findCombination = (current, start) => {
      const currentWeight = current.reduce((sum, pkg) => sum + pkg.weight, 0);
      if (currentWeight <= maxWeight) {
        results.push([...current]);
      }

      for (let i = start; i < packages.length; i++) {
        current.push(packages[i]);
        findCombination(current, i + 1);
        current.pop();
      }
    };

    findCombination([], 0);
    return results;
  }

  findBestCombination(packages, maxWeight) {
    const combinations = this.getCombinations(packages, maxWeight);
    return combinations.reduce((best, current) => {
      const currentWeight = current.reduce((sum, pkg) => sum + pkg.weight, 0);
      const bestWeight = best.reduce((sum, pkg) => sum + pkg.weight, 0);
      return currentWeight > bestWeight ? current : best;
    }, []);
  }

  countDecimalPlaces(number) {
    let numberStr = number.toString();    
    if (numberStr.includes('.')) {
        let decimalPart = numberStr.split('.')[1];        
        return decimalPart.length;
    } else {
        return 0;
    }
}

  scheduleDeliveries(packages) {
    packages.sort((a, b) => b.weight - a.weight || a.distance - b.distance);

    let currentTime = 0;

    while (packages.length > 0) {
      const vehicle = this.vehicles.reduce((a, b) => (a.availableAt < b.availableAt ? a : b));
      const tripPackages = this.findBestCombination(packages, vehicle.maxWeight);

      if (tripPackages.length > 0) {
        const maxDistance = Math.max(...tripPackages.map(pkg => pkg.distance));
        let _tripTime = maxDistance / vehicle.speed;
        _tripTime = Math.floor(_tripTime * 100) / 100

        tripPackages.forEach(pkg => {
          const foundDistance = pkg.distance;
          let tripTime = foundDistance / vehicle.speed;
          tripTime = Math.floor(tripTime * 100) / 100;
          const deliveryTime = vehicle.availableAt + tripTime;
          this.scheduledPackages.push({
            id: pkg.id,
            deliveryTime: this.countDecimalPlaces(deliveryTime) > 0 ? Math.floor(deliveryTime * 100) / 100 : deliveryTime,
          });
        });
        vehicle.availableAt += (_tripTime * 2);
        currentTime = Math.max(currentTime, vehicle.availableAt);
        if (currentTime > 0) Math.floor(currentTime * 100) / 100;

        for (const pkg of tripPackages) {
          const index = packages.findIndex(p => p.id === pkg.id);
          if (index !== -1) {
            packages.splice(index, 1);
          }
        }
      }
    }

    const sortedPackageByID = this.scheduledPackages.sort((a, b) => a.id.localeCompare(b.id));

    return sortedPackageByID;
  }
}

module.exports = DeliveryScheduler;
