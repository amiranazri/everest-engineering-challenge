class Offer {
  constructor(
    code,
    minDistance,
    maxDistance,
    minWeight,
    maxWeight,
    discountPercentage
  ) {
    this.code = code;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.minWeight = minWeight;
    this.maxWeight = maxWeight;
    this.discountPercentage = discountPercentage;
  }

  isValid(weight, distance) {
    return (
      weight >= this.minWeight &&
      weight <= this.maxWeight &&
      distance >= this.minDistance &&
      distance <= this.maxDistance
    );
  }

  calculateDiscount(amount) {
    return amount * (this.discountPercentage / 100);
  }
}

module.exports = Offer;
