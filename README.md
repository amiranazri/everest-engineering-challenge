# Koriko Courier Service

Welcome to Koriko Courier Service, where we deliver happiness, one package at a time! 🚚✨

## Overview

Koriko Courier Service is a small distance courier service founded by Kiki, Tombo, and their adorable cat Joji. With a fleet of vehicles and dedicated driver partners, we provide efficient and reliable delivery solutions to our customers.

## Features

- **Delivery Cost Estimation with Offers**: Our command-line application allows you to estimate the total delivery cost for each package, taking into account any available offers and discounts.

- **Delivery Time Estimation**: We optimize delivery routes and schedules to ensure packages are delivered promptly and efficiently.

## Getting Started

To get started with Koriko Courier Service, follow these simple steps:

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone https://github.com/your-username/koriko-courier-service.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

```bash
cd koriko-courier-service
npm install
```
 
3. **Run the Application**: Start the command-line application to estimate delivery costs and schedule deliveries.
```
npm start
```

4. **Follow the Prompts**: Enter the required information as prompted to estimate delivery costs and schedule deliveries.

## How to Use

### Example Input
```plaintext
base_delivery_cost no_of_packges
pkg_id1 pkg_weight1_in_kg distance1_in_km offer_code1
no_of_vehicles max_speed max_carriable_weight

...

100 3
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 10 100 OFR003
2 70 200
```

### Example Output
```plaintext
pkg_id1 discount1 total_cost1 estimated_delivery_time1_in_hours

...

PKG1 0 175 3.56
PKG2 0 275 1.78
PKG3 35 665 1.42
```

## Contributing
We welcome contributions from everyone! If you have ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the [ISC License](LICENSE).

## Acknowledgements
I would like to thank Everest Engineering for providing the challenge and opportunity to build Koriko Courier Service. Special thanks to Kiki, Tombo, and Joji for their inspiration and support throughout the journey! <3
