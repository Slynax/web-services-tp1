import { Router, Request, Response } from 'express';
import { Flight } from '@app-types/flights';

const router = Router();

const flights: Array<Flight> = [
  { id: 1, numero: 'AF123', compagnie: 'Air France', origine: 'Paris', destination: 'New York', heureDepart: '2023-10-01T10:00:00Z', heureArrivee: '2023-10-01T18:00:00Z', prix: 500, places: 150 },
  { id: 2, numero: 'LH456', compagnie: 'Lufthansa', origine: 'Frankfurt', destination: 'Tokyo', heureDepart: '2023-10-02T14:30:00Z', heureArrivee: '2023-10-03T08:30:00Z', prix: 800, places: 200 },
  { id: 3, numero: 'DL789', compagnie: 'Ryanair', origine: 'Atlanta', destination: 'London', heureDepart: '2023-10-03T16:45:00Z', heureArrivee: '2023-10-04T06:45:00Z', prix: 600, places: 180 },
];

router.get('/', (req: Request, res: Response) => {
  res.json(flights);
});

export default router; 