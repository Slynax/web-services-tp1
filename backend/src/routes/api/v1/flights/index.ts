import { Router } from 'express';
import List from './list';

const router = Router();

router.use('/', List);

export default router;
