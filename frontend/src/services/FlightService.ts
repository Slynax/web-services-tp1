import type { Flight } from '@/types/Flight';
import { config } from '@/config';

export class FlightService {
  static async getFlights(): Promise<Flight[]> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/flights`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const flights: Flight[] = await response.json();
      return flights;
    } catch (error) {
      console.error('Erreur lors du chargement des vols:', error);
      throw new Error('Impossible de charger les vols. Vérifiez votre connexion.');
    }
  }
}
