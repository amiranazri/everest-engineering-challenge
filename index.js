const readline = require("readline");
const Offer = require("./src/models/Offer");
const Package = require("./src/models/Package");
const Vehicle = require("./src/models/Vehicle");
const OfferRepository = require("./src/repositories/OfferRepository");
const DeliveryScheduler = require("./src/services/DeliveryScheduler");
const { calculateCost, calculateDiscount } = require("./src/utils/CostUtils");
const {
  getPackagesInput,
  getVehiclesInput,
} = require("./src/utils/InputUtils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const offerRepo = new OfferRepository();
offerRepo.addOffer(new Offer("OFR001", 0, 200, 70, 200, 10));
offerRepo.addOffer(new Offer("OFR002", 50, 150, 100, 250, 7));
offerRepo.addOffer(new Offer("OFR003", 50, 250, 10, 150, 5));

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isNonNegativeInteger = (value) => Number.isInteger(value) && value >= 0;
const isNonNegativeNumber = (value) => !isNaN(value) && value >= 0;

rl.question(
  "Enter base delivery cost and number of packages (e.g., 100 3): ",
  (input) => {
    const [baseCost, numPackages] = input.split(" ").map(Number);

    if (!isNonNegativeNumber(baseCost) || !isPositiveInteger(numPackages)) {
      console.log(
        "Invalid input. Please enter a non-negative base cost and a positive number of packages."
      );
      rl.close();
      return;
    }

    getPackagesInput(numPackages, rl, (packages) => {
      console.log("Packages:", packages);

      rl.question(
        "Enter number of vehicles, max speed, and max carriable weight (e.g., 2 70 200): ",
        (input) => {
          const [numVehicles, maxSpeed, maxWeight] = input
            .split(" ")
            .map(Number);

          if (
            !isPositiveInteger(numVehicles) ||
            !isNonNegativeNumber(maxSpeed) ||
            !isNonNegativeNumber(maxWeight)
          ) {
            console.log(
              "Invalid input. Please enter a positive number of vehicles, a non-negative max speed, and a non-negative max carriable weight."
            );
            rl.close();
            return;
          }

          const vehicles = getVehiclesInput(numVehicles, maxWeight, maxSpeed);
          const scheduler = new DeliveryScheduler(vehicles);

          const deliveries = scheduler.scheduleDeliveries([...packages]);

          console.log("Deliveries:", deliveries);

          deliveries.forEach((delivery) => {
            const pkg = packages.find((pkg) => pkg.id === String(delivery.id));
            if (pkg) {
              const totalCost = calculateCost(
                baseCost,
                pkg.weight,
                pkg.distance
              );
              const discount = calculateDiscount(pkg, totalCost, offerRepo);
              console.log(
                `${pkg.id} ${discount.toFixed(0)} ${totalCost - discount} ${
                  delivery.deliveryTime
                }`
              );
            } else {
              console.log(`Package with ID ${delivery.id} not found`);
            }
          });

          rl.close();
        }
      );
    });
  }
);
