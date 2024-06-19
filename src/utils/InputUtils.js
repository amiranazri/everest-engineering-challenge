const Package = require("../models/Package");
const Vehicle = require("../models/Vehicle");

function getPackagesInput(numPackages, rl, callback) {
  const packages = [];

  const getPackages = (count) => {
    if (count === numPackages) {
      callback(packages);
      return;
    }

    rl.question("Enter package details: ", (input) => {
      const [id, weight, distance, offerCode] = input.split(" ");
      packages.push(
        new Package(id, Number(weight), Number(distance), offerCode)
      );
      getPackages(count + 1);
    });
  };

  getPackages(0);
}

function getVehiclesInput(numVehicles, maxWeight, maxSpeed) {
  return Array.from(
    { length: numVehicles },
    (_, i) => new Vehicle(i + 1, maxWeight, maxSpeed)
  );
}

module.exports = {
  getPackagesInput,
  getVehiclesInput,
};
