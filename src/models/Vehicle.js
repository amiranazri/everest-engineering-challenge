class Vehicle {
  constructor(id, maxWeight, speed) {
    this.id = id;
    this.maxWeight = maxWeight;
    this.speed = speed;
    this.availableAt = 0; // time when the vehicle is available for the next trip
  }
}

module.exports = Vehicle;
