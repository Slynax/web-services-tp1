import { Router } from 'express';
import Google from './google';
import Auth0 from './auth0';

const router = Router();

router.use('/google', Google);
router.use('/auth0', Auth0);

export default router;
