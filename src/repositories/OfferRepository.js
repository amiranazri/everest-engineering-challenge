const Offer = require("../models/Offer");
const fs = require("fs");
const path = require("path");

class OfferRepository {
  constructor() {
    this.offers = new Map();
    this.loadOffers();
  }

  loadOffers() {
    const offersPath = path.join(__dirname, "../../config/offers.json");
    const offersData = JSON.parse(fs.readFileSync(offersPath));
    offersData.forEach((offer) => {
      this.addOffer(
        new Offer(
          offer.code,
          offer.minDistance,
          offer.maxDistance,
          offer.minWeight,
          offer.maxWeight,
          offer.discountPercentage
        )
      );
    });
  }

  addOffer(offer) {
    this.offers.set(offer.code, offer);
  }

  getOffer(code) {
    return this.offers.get(code);
  }
}

module.exports = OfferRepository;
