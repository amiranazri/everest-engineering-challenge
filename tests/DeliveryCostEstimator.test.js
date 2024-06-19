const Offer = require("../src/models/Offer");
const Package = require("../src/models/Package");
const OfferRepository = require("../src/repositories/OfferRepository");
const DeliveryCostEstimator = require("../src/services/DeliveryCostEstimator");

test("DeliveryCostEstimator calculates cost correctly without discount", () => {
  const offerRepo = new OfferRepository();
  const estimator = new DeliveryCostEstimator(100, offerRepo);

  const pkg = new Package("PKG1", 5, 5, "OFR001");
  const { discount, totalCost } = estimator.calculateCost(pkg);

  expect(discount).toBe(0);
  expect(totalCost).toBe(175); // Base cost 100 + 5*10 + 5*5 = 175
});

test("DeliveryCostEstimator calculates cost correctly with discount", () => {
  const offerRepo = new OfferRepository();
  offerRepo.addOffer(new Offer("OFR003", 50, 250, 10, 150, 5));
  const estimator = new DeliveryCostEstimator(100, offerRepo);

  const pkg = new Package("PKG3", 10, 100, "OFR003");
  const { discount, totalCost } = estimator.calculateCost(pkg);

  expect(discount).toBe(35); // 5% of 700
  expect(totalCost).toBe(665); // 700 - 35
});

test("DeliveryCostEstimator handles invalid offer code", () => {
  const offerRepo = new OfferRepository();
  const estimator = new DeliveryCostEstimator(100, offerRepo);

  const pkg = new Package("PKG4", 5, 5, "INVALID");
  const { discount, totalCost } = estimator.calculateCost(pkg);

  expect(discount).toBe(0);
  expect(totalCost).toBe(175);
});
