const Vehicle = require("../src/models/Vehicle");
const Package = require("../src/models/Package");
const DeliveryScheduler = require("../src/services/DeliveryScheduler");

test("DeliveryScheduler schedules deliveries correctly", () => {
  const vehicles = [new Vehicle(1, 200, 70), new Vehicle(2, 200, 70)];
  const scheduler = new DeliveryScheduler(vehicles);

  const packages = [
    new Package("PKG1", 50, 30, "OFR001"),
    new Package("PKG2", 75, 125, "OFR008"),
    new Package("PKG3", 175, 100, "OFR003"),
    new Package("PKG4", 110, 60, "OFR002"),
    new Package("PKG5", 155, 95, "NA"),
  ];

  const deliveries = scheduler.scheduleDeliveries(packages);

  expect(deliveries).toEqual([
    { id: "PKG2", deliveryTime: "1.78" },
    { id: "PKG4", deliveryTime: "0.85" },
    { id: "PKG3", deliveryTime: "1.42" },
    { id: "PKG5", deliveryTime: "4.19" },
    { id: "PKG1", deliveryTime: "3.98" },
  ]);
});
