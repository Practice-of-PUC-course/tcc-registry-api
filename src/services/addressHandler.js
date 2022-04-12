import { getByUserId, add } from '../model/address.dao.js';

/**
 * Gets an Address by give user identifier.
 * @returns An Address, or false on failure.
 */
const getAddress=async (id)=>{
    const address=await getByUserId(id).catch(
        (reason)=>{
            console.log("Failure on get address: "+reason);
            return false;
        }
    );
    return address;
};

const addAddress=async (userId, address)=>{
    return await add(userId, address).catch(
        (reason)=>{
            console.log("Failure on add address: "+reason);
            return false;
        }
    );
};

export{ getAddress, addAddress };