/**
 * Routers for address 
 */
import { getAddress, addAddress, updateAddress } from '../services/addressHandler.js';
import { makeDTO } from '../model/address.dto.js';
import pkg from 'express';
const { Router } = pkg;
 
const addressRouter = Router();

/**
 * Get an address by user id.
 */
addressRouter.get("/:userId",
    async (req, res) => {
        const { userId } = req.params;
        let address=await getAddress(userId);
        if (!address) res.status(404).json({ error: 'Missing address for the given user.' });
        else res.json(address);
    }
);

/**
 * Add an address for a user.
 */
addressRouter.post("/",
    async (req, res) => {
        
        const userId=req.query.userId;
        let a=makeDTO(req);

        if(!userId || !a.isValid()) res.status(400).json({ error: 'One or more required parameters are missing: userId, street, number, county, state, longitude, latitude.' });
        else{
            let isok=await addAddress(userId, a);
            if (!isok) res.status(500).json({ error: 'Adding address for the given user was failure.' });
            else res.status(200).json({ msg: 'The address has been added.' });
        }
    }
);

/**
 * Update an address for a user.
 */
addressRouter.put("/",
    async (req, res) => {

        const addressId=req.query.addressId;
        const userId=req.query.userId;
        let a=makeDTO(req);

        if(!addressId || !userId || !a.isValid()) res.status(400).json({ error: 'One or more required parameters are missing: userId, addressId street, number, county, state, longitude, latitude.' });
        else{
            let isok=await updateAddress(userId, a);
            if (!isok) res.status(500).json({ error: 'Updating address for the given user was failure.' });
            else res.status(200).json({ msg: 'The address has been updated.' });
        }
    }
);

export { addressRouter };
 