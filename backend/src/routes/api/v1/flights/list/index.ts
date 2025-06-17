import { Router, Request, Response } from 'express';
import { Flight } from '@app-types/flights';

const router = Router();

const flights: Array<Flight> = [
  { id: 1, number: 'AF123', airline: 'Air France', origin: 'Paris', destination: 'New York', departureTime: '2023-10-01T10:00:00Z', arrivalTime: '2023-10-01T18:00:00Z', price: 500, seats: 150 },
  { id: 2, number: 'LH456', airline: 'Lufthansa', origin: 'Frankfurt', destination: 'Tokyo', departureTime: '2023-10-02T14:30:00Z', arrivalTime: '2023-10-03T08:30:00Z', price: 800, seats: 200 },
  { id: 3, number: 'DL789', airline: 'Ryanair', origin: 'Atlanta', destination: 'London', departureTime: '2023-10-03T16:45:00Z', arrivalTime: '2023-10-04T06:45:00Z', price: 600, seats: 180 },
];

router.get('/', (req: Request, res: Response) => {
  res.json(flights);
});

export default router; 