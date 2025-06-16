import { Router, Request, Response } from 'express';
import { Flight } from '@app-types/flights';

const router = Router();

const flights: Array<Flight> = [
  { id: 1, numero: 'AF123', compagnie: 'Air France', origine: 'Paris', destination: 'New York', dateDepart: '2023-10-01', heureDepart: '10:00', dateArrivee: '2023-10-01', heureArrivee: '14:00', prix: 500, places: 150 },
  { id: 2, numero: 'LH456', compagnie: 'Lufthansa', origine: 'Frankfurt', destination: 'Tokyo', dateDepart: '2023-10-02', heureDepart: '14:30', dateArrivee: '2023-10-03', heureArrivee: '08:30', prix: 800, places: 200 },
  { id: 3, numero: 'DL789', compagnie: 'Delta', origine: 'Atlanta', destination: 'London', dateDepart: '2023-10-03', heureDepart: '16:45', dateArrivee: '2023-10-04', heureArrivee: '06:45', prix: 600, places: 180 },
];

router.get('/', (req: Request, res: Response) => {
  res.json(flights);
});

export default router; 