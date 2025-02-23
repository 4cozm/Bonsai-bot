import express from 'express';

import { getAltCharacters } from '../controllers/db.js';
const dbRouter = express.Router();

dbRouter.get('/getAltCharacters', getAltCharacters);

export default dbRouter;
