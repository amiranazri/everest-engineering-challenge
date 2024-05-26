const Offer = require("../models/Offer");

class OfferRepository {
  constructor() {
    this.offers = [];
  }

  addOffer(offer) {
    this.offers.push(offer);
  }

  getOffer(code) {
    return this.offers.find((offer) => offer.code === code);
  }
}

module.exports = OfferRepository;
