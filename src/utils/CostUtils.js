const calculateCost = (baseCost, weight, distance) => {
  return baseCost + weight * 10 + distance * 5;
};

const calculateDiscount = (pkg, totalCost, offerRepo) => {
  const offer = offerRepo.getOffer(pkg.offerCode);
  return offer && offer.isValid(pkg.weight, pkg.distance)
    ? offer.calculateDiscount(totalCost)
    : 0;
};

module.exports = {
  calculateCost,
  calculateDiscount,
};
