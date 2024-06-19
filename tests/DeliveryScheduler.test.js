const Package = require("../src/models/Package");
const Vehicle = require("../src/models/Vehicle");
const DeliveryScheduler = require("../src/services/DeliveryScheduler");

test("DeliveryScheduler schedules packages correctly for one vehicle", () => {
  const vehicles = [new Vehicle(1, 200, 70)];
  const scheduler = new DeliveryScheduler(vehicles);

  const packages = [
    new Package("PKG1", 50, 30, "OFR001"),
    new Package("PKG2", 75, 125, "OFR002"),
    new Package("PKG3", 175, 100, "OFR003"),
    new Package("PKG4", 110, 60, "OFR002"),
    new Package("PKG5", 155, 95, "NA"),
  ];

  const deliveries = scheduler.scheduleDeliveries(packages);

  expect(deliveries).toHaveLength(5);
  expect(deliveries).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: "PKG1" }),
      expect.objectContaining({ id: "PKG2" }),
      expect.objectContaining({ id: "PKG3" }),
      expect.objectContaining({ id: "PKG4" }),
      expect.objectContaining({ id: "PKG5" }),
    ])
  );
});

test("DeliveryScheduler schedules packages correctly for multiple vehicles", () => {
  const vehicles = [new Vehicle(1, 200, 70), new Vehicle(2, 200, 70)];
  const scheduler = new DeliveryScheduler(vehicles);

  const packages = [
    new Package("PKG1", 50, 30, "OFR001"),
    new Package("PKG2", 75, 125, "OFR002"),
    new Package("PKG3", 175, 100, "OFR003"),
    new Package("PKG4", 110, 60, "OFR002"),
    new Package("PKG5", 155, 95, "NA"),
  ];

  const deliveries = scheduler.scheduleDeliveries(packages);

  expect(deliveries).toHaveLength(5);
  expect(deliveries).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: "PKG1" }),
      expect.objectContaining({ id: "PKG2" }),
      expect.objectContaining({ id: "PKG3" }),
      expect.objectContaining({ id: "PKG4" }),
      expect.objectContaining({ id: "PKG5" }),
    ])
  );
});

test("DeliveryScheduler handles no packages gracefully", () => {
  const vehicles = [new Vehicle(1, 200, 70)];
  const scheduler = new DeliveryScheduler(vehicles);

  const packages = [];

  const deliveries = scheduler.scheduleDeliveries(packages);

  expect(deliveries).toHaveLength(0);
});
