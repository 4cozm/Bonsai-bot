import express from 'express';

import { signUp, callback } from '../controllers/esi.js';

const esiRouter = express.Router();

esiRouter.get('/signUp', signUp);
esiRouter.get('/callback', callback);
export default esiRouter;
