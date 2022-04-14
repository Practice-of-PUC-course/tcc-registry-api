/**
 * Routers for user 
 */
import { getUsers, getUsersByTypeId, getTypes } from '../services/userHandler.js';
import pkg from 'express';
const { Router } = pkg;

const userRouter = Router();
const userTypeRouter = Router();

// get user by type id
userRouter.get("/type/:id",
    async (req, res) => {
        const { id } = req.params;
        const data = await getUsersByTypeId(id);
        if(!data)
            res.status(500).json({ error: 'Failure on take a users.' });
        else res.json(data);
    }
);

// get user by id
userRouter.get("/:id",
    async (req, res) => {
        const { id } = req.params;
        const data = await getUsers(id);
        if(!data)
            res.status(500).json({ error: 'Failure on take a users.' });
        else res.json(data);
    }
);

// get all users
userRouter.get("/",
    async (req, res) => {
        const data = await getUsers();
        if(!data)
            res.status(500).json({ error: 'Failure on take a users.' });
        else res.json(data);
    }
);

// get user type by id
userTypeRouter.get("/:id",
    async (req, res) => {
        const { id } = req.params;
        const data = await getTypes(id);
        if(!data)
            res.status(500).json({ error: 'Failure on take a user types.' });
        else res.json(data);
    }
);

// get all user type
userTypeRouter.get("/",
    async (req, res) => {
        const data = await getTypes();
        if(!data)
            res.status(500).json({ error: 'Failure on take a user types.' });
        else res.json(data);
    }
);

export { userRouter, userTypeRouter };
