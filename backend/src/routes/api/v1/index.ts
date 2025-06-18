import { Router } from 'express';
import Flights from './flights';
import Auth from './auth';
import Callback from './callback/google';

const router = Router();

router.use('/flights', Flights);
router.use('/auth', Auth);
router.use('/callback', Callback);

export default router;
