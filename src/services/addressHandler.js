import { Address } from '../model/address.dao.js';
import { addressDTO } from '../model/address.dto.js';
import { DB } from '../services/dbHandler.js';


const createAddress=(addressDTO)=>{
    (async () => {
        await sequelize.sync();
        const address = await Address.create({
            streetName: addressDTO.streetName,
            houseNumber: addressDTO.houseNumber,
            countyName: addressDTO.countyName,
            stateName: addressDTO.stateName,
            
        });
        console.log(address.toJSON());
    })();
};

/**
 * Validate the params of the Address object
 * @returns true if all params isn't empty
 */
const isValidAddress=(address)=>{
    const isEmpty=(s)=>{return s==''};
    return (!isEmpty(address.street) && !isEmpty(address.number) && !isEmpty(address.county) && !isEmpty(address.state));
};

const createSafeAddress=(street, number, county, state)=>{
    let address=new Address(street, number, county, state);
    if(isValidAddress(address)) return address;
    else return false;
};

export{ createAddress };