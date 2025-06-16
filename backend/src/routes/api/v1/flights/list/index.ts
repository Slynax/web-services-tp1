import { Router, Request, Response } from 'express';

const router = Router();

// Liste de vols codée en dur
const flights = [
  { id: 1, company: 'Air France', departure: 'Paris', arrival: 'New York', time: '10:00' },
  { id: 2, company: 'Lufthansa', departure: 'Frankfurt', arrival: 'Tokyo', time: '14:30' },
  { id: 3, company: 'Delta', departure: 'Atlanta', arrival: 'London', time: '16:45' },
];

router.get('/', (req: Request, res: Response) => {
  res.json(flights);
});

export default router; 