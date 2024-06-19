const readline = require("readline");
const Offer = require("./src/models/Offer");
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

rl.question("Enter base delivery cost and number of packages: ", (input) => {
  const [baseCost, numPackages] = input.split(" ").map(Number);

  getPackagesInput(numPackages, rl, (packages) => {
    console.log("Packages:", packages);

    rl.question(
      "Enter number of vehicles, max speed, and max carriable weight: ",
      (input) => {
        const [numVehicles, maxSpeed, maxWeight] = input.split(" ").map(Number);

        const vehicles = getVehiclesInput(numVehicles, maxWeight, maxSpeed);
        const scheduler = new DeliveryScheduler(vehicles);

        const deliveries = scheduler.scheduleDeliveries([...packages]);

        console.log("Deliveries:", deliveries);

        deliveries.forEach((delivery) => {
          const pkg = packages.find((pkg) => pkg.id === String(delivery.id));
          if (pkg) {
            const totalCost = calculateCost(baseCost, pkg.weight, pkg.distance);
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
});
