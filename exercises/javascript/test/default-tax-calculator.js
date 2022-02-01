const { FuelType } = require('../fuel-type');
const { TaxCalculator } = require('../tax-calculator');

/**
* @deprecated
*/
let DefaultTaxCalculator = class DefaultTaxCalculator extends TaxCalculator {
  constructor(year) {
    super(year);
  } 

  calculateTax(vehicle) {
    const co2 = vehicle.co2Emissions;
    const fuelType = vehicle.fuelType;
    const price = vehicle.listPrice;
    const year = vehicle.dateOfFirstRegistration.getFullYear()
    const maxIntervals = [0, 50, 75, 90,  100, 110, 130, 150, 170, 190, 225,  255, 1000000]
    const petrolPrices = [0, 10, 25, 105, 125, 145, 165, 205, 515, 830, 1240, 1760, 2070]
    const isStory4Enabled = true;
    const isStory5Enabled = true;


    if (isStory4Enabled) {
      if (this.getYear() > year) {
        if (price <= 40000) {
          switch (fuelType) {
            case (FuelType.PETROL):
            case (FuelType.DIESEL):
              return 140;
            case (FuelType.ELECTRIC):
              return 0;
            case (FuelType.ALTERNATIVE_FUEL):
              return 130;
            default: break;
          }
        }
      }
    }
    

    if (isStory5Enabled) {
      if (this.getYear() > year) {
        if (fuelType == FuelType.PETROL || fuelType == FuelType.DIESEL) {
          return 450
        } else if (fuelType == FuelType.ELECTRIC) {
          return 310
        } else if (fuelType == FuelType.ALTERNATIVE_FUEL) {
          return 440
        }
      }
    }    

      if (fuelType == FuelType.PETROL) {
        const index = maxIntervals.findIndex(interval => co2 <= interval);
        return petrolPrices[index];

    } else if (fuelType == FuelType.ALTERNATIVE_FUEL) {
        if (co2 <= 50) return 0;
        else if (co2 <= 75) return 15
        else if (co2 <= 90) return 95
        else if (co2 <= 100) return 115
        else if (co2 <= 110) return 135
        else if (co2 <= 130) return 155
        else if (co2 <= 150) return 195
        else if (co2 <= 170) return 505
        else if (co2 <= 190) return 820
        else if (co2 <= 225) return 1230
        else if (co2 <= 255) return 1750
        else return 2060
    } else if (fuelType == FuelType.ELECTRIC) {
        return 0
    } else if (vehicle.fuelType == FuelType.DIESEL) {
        if (co2 <= 0) return 0;
        else if (co2 <= 50) return 25
        else if (co2 <= 75) return 105
        else if (co2 <= 90) return 125
        else if (co2 <= 100) return 145
        else if (co2 <= 110) return 165
        else if (co2 <= 130) return 205
        else if (co2 <= 150) return 515
        else if (co2 <= 170) return 830
        else if (co2 <= 190) return 1240
        else if (co2 <= 225) return 1760
        else if (co2 <= 255) return 2070
        else return 2070
      }
  }
}


module.exports = {
  DefaultTaxCalculator: DefaultTaxCalculator
}