const Package = require("../models/Package");
const Vehicle = require("../models/Vehicle");

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isNonNegativeNumber = (value) => !isNaN(value) && value >= 0;

function getPackagesInput(numPackages, rl, callback) {
  const packages = [];

  const getPackages = (count) => {
    if (count === numPackages) {
      callback(packages);
      return;
    }

    rl.question(
      `Enter package details (ID | weight | distance | offerCode) for package ${
        count + 1
      }: `,
      (input) => {
        const [id, weight, distance, offerCode] = input.split(" ");

        if (
          !id ||
          !isNonNegativeNumber(Number(weight)) ||
          !isNonNegativeNumber(Number(distance)) ||
          !offerCode
        ) {
          console.log(
            "Invalid input. Please enter valid package details (ID | weight | distance | offerCode)."
          );
          getPackages(count);
          return;
        }

        packages.push(
          new Package(id, Number(weight), Number(distance), offerCode)
        );
        getPackages(count + 1);
      }
    );
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
