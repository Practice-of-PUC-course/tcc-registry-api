/**
 * Routers for address 
 */
import { getAddress, addAddress } from '../services/addressHandler.js';
import { Address } from '../model/address.dto.js';
import { Point } from '../model/point.dto.js';
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
        const street=req.query.street;
        const number=req.query.number;
        const county=req.query.county;
        const state=req.query.state;
        const lng=req.query.longitude;
        const lat=req.query.latitude;
        const userId=req.query.userId;

        let p = new Point(lng, lat);
        let a = new Address(street, number, county, state, p);
        if(!userId || !a.isValid()) res.status(400).json({ error: 'One or more required parameters are missing: userId, street, number, county, state, longitude, latitude.' });
        else{
            let isok=await addAddress(userId, a);
            if (!isok) res.status(500).json({ error: 'Adding address for the given user was failure.' });
            else res.status(200).json({ msg: 'The address has been added.' });
        }
    }
);

export { addressRouter };
 