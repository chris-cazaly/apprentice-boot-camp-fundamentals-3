const { FuelType } = require('../fuel-type');
const { TaxCalculator } = require('../tax-calculator');

/**
* @deprecated
*/
let DefaultTaxCalculator = class DefaultTaxCalculator extends TaxCalculator {
  constructor() {
    super();
  } 

    calculateTax(vehicle) {
      let taxPrice;
      const {co2Emissions, fuelType} = vehicle;

      const taxPrices = {
        'Petrol' : {
          256: 2070,
          226: 1760,
          191: 1240,
          171: 830,
          151: 515,
          131: 205,
          111: 165,
          101: 145,
          91: 125,
          76: 105,
          51: 25,
          1: 10,
          0: 0
        }
      }
      
      const vehicleCo2 = Object.keys(taxPrices[fuelType])
              .sort((a,b) => b - a)
              .find(element => co2Emissions >= element);

      taxPrice = taxPrices[fuelType][vehicleCo2];

      return taxPrice;
  }
}

module.exports = {
  DefaultTaxCalculator: DefaultTaxCalculator
}