import { Router } from 'express';
import Flights from './flights';

const router = Router();

router.use('/flights', Flights);

export default router;
