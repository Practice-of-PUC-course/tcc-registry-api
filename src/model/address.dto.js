import { Point } from './point.dto.js';
/**
 * Represents the fractions of an address to use to transfer data from entry requests to store.
 * It's should validate entries.
 */
class Address {

    /**
     * The parts of an address.
     * @param {integer} id the identifier of an address (optional, exists if is update).
     * @param {string} streetName the name of an street (mandatory).
     * @param {string} houseNumber the number of a house on the street (mandatory).
     * @param {string} countyName the county name where the street is (mandatory).
     * @param {string} stateName the state of coutry where the county is (mandatory).
     * @param {Point} location the geographic coordinates related of the address (optional).
     */
    constructor(id, streetName, houseNumber, countyName, stateName, location){
        this._isValid=true;// optimistic approach
        /**
         * Validate one entry param before set into Address instance object.
         * @param {string} aStr, the value of one entry param as string.
         * @returns true if is valid or false otherwise
         */
        const isValidParam=(aStr)=>{
            let isok=typeof aStr=='string' && aStr!='' && !aStr.includes(',');
            this._isValid=this._isValid?isok:this._isValid;// if any is false, the instance is not valid
            return isok;
        };
        this.id=id;// can be null if is a new address registry
        this.street=isValidParam(streetName)?(streetName):('');
        this.number=isValidParam(houseNumber)?(houseNumber):('');
        this.county=isValidParam(countyName)?(countyName):('');
        this.state =isValidParam(stateName)?(stateName):('');
        this.location=(typeof location=='object')?(location):(null);//can be null
    };

    /**
     * Verify if the instance is ok.
     * @returns {boolean} true if all required parameters have a value or false otherwise.
     */
    isValid=()=>{
        return this._isValid;
    };

    /**
     * Export the data in this instance to JSON format to use in create model by Sequelize ORM.
     * @param {string|number} userId the user identifier.
     * @returns The data for this instance in JSON format.
     */
    toJson=(userId)=>{
        return {
            userId: userId,
            id: this.id,
            streetName: this.street,
            houseNumber: this.number,
            countyName: this.county,
            stateName: this.state,
            location: this.location.toGeoJson()
        };
    };
};

/**
 * Make a DTO instance from request parameters
 * @param {*} req the request reference.
 * @returns {Address} An instance from request parameters
 */
const makeDTO=(req)=>{
    const id=req.query.addressId;
    const street=req.query.street;
    const number=req.query.number;
    const county=req.query.county;
    const state=req.query.state;
    const lng=req.query.longitude;
    const lat=req.query.latitude;

    let p = new Point(lng, lat);
    return new Address(id, street, number, county, state, p);
};

export { Address, makeDTO };