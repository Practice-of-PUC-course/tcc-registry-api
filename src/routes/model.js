/**
 * Routers for manager model 
 */
import { DB } from '../services/dbHandler.js'
import pkg from 'express';
const { Router } = pkg;
 
const modelRouter = Router();

modelRouter.post("/",
    async (req, res) => {
        let db=new DB();
        if (!db) {
            res.status(400).json({ error: 'Bad database connection.' });
        }else{
            const data = db.createTables(true);
            if(!data)
                res.status(500).json({ error: 'Failure on create database tables.' });
            else res.json({status:"Tables has been created!"});
        }
    }
);

export { modelRouter };
 