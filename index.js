const readline = require("readline");
const Offer = require("./src/models/Offer");
const Package = require("./src/models/Package");
const Vehicle = require("./src/models/Vehicle");
const OfferRepository = require("./src/repositories/OfferRepository");
const DeliveryCostEstimator = require("./src/services/DeliveryCostEstimator");
const DeliveryScheduler = require("./src/services/DeliveryScheduler");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const offerRepo = new OfferRepository();
offerRepo.addOffer(new Offer("OFR001", 0, 200, 70, 200, 10));
offerRepo.addOffer(new Offer("OFR002", 50, 150, 100, 250, 7));
offerRepo.addOffer(new Offer("OFR003", 50, 250, 10, 150, 5));

rl.question("Enter base delivery cost and number of packages: ", (input) => {
  // console.log("Input received:", input);
  const [baseCost, numPackages] = input.split(" ").map(Number);
  const estimator = new DeliveryCostEstimator(baseCost, offerRepo);

  const packages = [];

  const getPackages = (count) => {
    if (count === numPackages) {
      rl.question(
        "Enter number of vehicles, max speed, and max carriable weight: ",
        (input) => {
          const [numVehicles, maxSpeed, maxWeight] = input
            .split(" ")
            .map(Number);

          const vehicles = Array.from(
            { length: numVehicles },
            (_, i) => new Vehicle(i + 1, maxWeight, maxSpeed)
          );
          const scheduler = new DeliveryScheduler(vehicles);

          const deliveries = scheduler.scheduleDeliveries(packages);

          // console.log("Deliveries:", deliveries);
          // console.log("Packages:", packages);
          deliveries.forEach((delivery) => {
            // console.log("Delivery ID:", delivery.id);
            const pkg = packages.find((pkg) => pkg.id === delivery.id);
            // console.log("Package:", pkg);
            const totalCost = calculateCost(baseCost, pkg.weight, pkg.distance);
            const discount = calculateDiscount(pkg, totalCost);
            // console.log(
            //   `${pkg.id} ${discount} ${totalCost - discount} ${
            //     delivery.deliveryTime
            //   }`
            // );
          });

          rl.close();
        }
      );
      return;
    }

    rl.question("Enter package details: ", (input) => {
      const [id, weight, distance, offerCode] = input.split(" ");
      // console.log("Parsed values:", id, weight, distance, offerCode);
      packages.push(
        new Package(id, Number(weight), Number(distance), offerCode)
      );
      getPackages(count + 1);
    });
  };

  getPackages(0);
});

function calculateCost(baseCost, weight, distance) {
  return baseCost + weight * 10 + distance * 5;
}

function calculateDiscount(pkg, totalCost) {
  // console.log(
  //   `${pkg.id} ${discount} ${totalCost - discount} ${delivery.deliveryTime}`
  // );
  const offerRepo = new OfferRepository();
  offerRepo.addOffer(new Offer("OFR001", 0, 200, 70, 200, 10));
  offerRepo.addOffer(new Offer("OFR002", 50, 150, 100, 250, 7));
  offerRepo.addOffer(new Offer("OFR003", 50, 250, 10, 150, 5));
  const offer = offerRepo.getOffer(pkg.offerCode);
  return offer && offer.isValid(pkg.weight, pkg.distance)
    ? offer.calculateDiscount(totalCost)
    : 0;
}
