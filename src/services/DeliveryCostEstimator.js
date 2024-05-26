const OfferRepository = require("../repositories/OfferRepository");

class DeliveryCostEstimator {
  constructor(baseCost, offerRepository) {
    this.baseCost = baseCost;
    this.offerRepository = offerRepository;
  }

  calculateCost(pkg) {
    const baseDeliveryCost = this.baseCost;
    const weightCost = pkg.weight * 10;
    const distanceCost = pkg.distance * 5;
    const totalCostWithoutDiscount =
      baseDeliveryCost + weightCost + distanceCost;

    const offer = this.offerRepository.getOffer(pkg.offerCode);
    let discount = 0;

    if (offer && offer.isValid(pkg.weight, pkg.distance)) {
      discount = offer.calculateDiscount(totalCostWithoutDiscount);
    }

    const totalCost = totalCostWithoutDiscount - discount;

    return { discount, totalCost };
  }
}

module.exports = DeliveryCostEstimator;
