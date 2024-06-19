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
   git clone https://github.com/amiranazri/everest-engineering-challenge
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

[Miro Board Flow Chart](https://miro.com/app/board/uXjVKBkyI9o=/?share_link_id=630963926507)

1. **Config**
    
    - **offers.json**: Stores offer codes and their criteria, allowing easy modification and extension of discount rules.
2. **src**
    
    - **models**: Contains the core data structures.
        
        - **Offer.js**: Defines an offer's properties and methods for validation and discount calculation.
        - **Package.js**: Represents a delivery package.
        - **Vehicle.js**: Represents a delivery vehicle.
    - **repositories**: Handles data management.
        
        - **OfferRepository.js**: Loads and manages offers from the JSON configuration.
    - **services**: Contains business logic.
        
        - **DeliveryCostEstimator.js**: Calculates the delivery cost considering potential discounts.
        - **DeliveryScheduler.js**: Manages the scheduling of package deliveries based on vehicle availability and package weight.
    - **utils**: Provides utility functions.
        
        - **CostUtils.js**: Functions for cost and discount calculations.
    - **tests**: Contains test cases.
        
        - **DeliveryCostEstimator.test.js**: Tests for the cost estimation logic.
        - **DeliveryScheduler.test.js**: Tests for the scheduling logic.

3. **index.js**: Entry point for the application, handling user input and coordinating between different module

## Explanation for Project Structure
- **Modularity**: Each part of the project (like models and services) is kept in its own section. This makes the code easier to manage and grow.
- **Separation of Concerns**: Different tasks are handled in different places (like data handling, business logic, and utilities), making the project easier to understand and work on.
- **Configuration Management**: Offer codes are stored in a separate file (config/offers.json). This makes it easy to update them without changing the main code.
- **Testing**: The tests folder contains tests to make sure everything works correctly, helping maintain the quality and reliability of the code.
- **Entry Point**: The index.js file is where the program starts. It manages user input and connects all parts of the project.

This setup helps create a flexible and scalable application for estimating delivery costs and scheduling deliveries, making it easy to develop and maintain each part of the system separately.

## Contributing
We welcome contributions from everyone! If you have ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the [ISC License](LICENSE).

## Acknowledgements
I would like to thank Everest Engineering for providing the challenge and opportunity to build Koriko Courier Service. Special thanks to Kiki, Tombo, and Joji for their inspiration and support throughout the journey! <3
