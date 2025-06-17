import type { Flight } from '@/types/Flight';
import { config } from '@/config';

export class FlightService {
  static async getFlights(): Promise<Flight[]> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/flights`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const flights: Flight[] = await response.json();
      return flights;
    } catch (error) {
      console.error('Flight loading error:', error);
      throw new Error('Unable to load flights. Check your connection.');
    }
  }
}
