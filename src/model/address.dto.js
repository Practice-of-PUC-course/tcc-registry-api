import { Point } from './point.js';
/**
 * Represents the fractions of an address to use to transfer data from entry requests to store.
 * It's should validate entries.
 */
class Address {

    /**
     * The parts of an address.
     * @param {string} streetName, the name of an street.
     * @param {string} houseNumber, the number of a house on the street. 
     * @param {string} countyName, the county name where the street is.
     * @param {string} stateName, the state of coutry where the county is.
     * @param {Point} location, the geographic coordinates related of the address.
     */
    constructor(streetName, houseNumber, countyName, stateName, location){
        /**
         * Validate one entry param before set into Address instance object.
         * @param {string} aStr, the value of one entry param as string.
         * @returns true if is valid or false otherwise
         */
        const isValidParam=(aStr)=>{
            return typeof aStr=='string' && aStr!='' && !aStr.includes(',');
        };

        this.street=isValidParam(streetName)?(streetName):('');
        this.number=isValidParam(houseNumber)?(houseNumber):('');
        this.county=isValidParam(countyName)?(countyName):('');
        this.state =isValidParam(stateName)?(stateName):('');
        this.location=(typeof location=='Point')?(location):(null);//can be null
    };   
};

export { Address };