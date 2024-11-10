import express from 'express';

import githubHook from '../controllers/git.js';

const gitRouter = express.Router();

gitRouter.post('/github-webhook', githubHook);

export default gitRouter;
