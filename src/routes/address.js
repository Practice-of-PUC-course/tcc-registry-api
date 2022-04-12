/**
 * Routers for address 
 */
import { createSafeAddress } from '../services/addressHandler.js';
import pkg from 'express';
const { Router } = pkg;
 
const addressRouter = Router();
 
addressRouter.get("/",
    async (req, res) => {
        const street=req.query.street;
        const number=req.query.number;
        const county=req.query.county;
        const state=req.query.state;
        let address=createSafeAddress(street, number, county, state);
        if (!address) {
            res.status(400).json({ error: 'is not a valid address. The expecter parameters are: street, number, county, state' });
        }else{
            const data = await getLocationByAddress(address);
            if(!data)
                res.status(500).json({ error: 'Failure on take a geocode for your address.' });
            else res.json(data);
        }
    }
);

export { addressRouter };
 