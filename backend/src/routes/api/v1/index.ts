import { Router } from 'express';
import Flights from './flights';
import Callback from './callback';
import Auth from './auth';

const router = Router();

router.use('/flights', Flights);
router.use('/callback', Callback);
router.use('/auth', Auth);

export default router;
