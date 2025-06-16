export interface Flight {
  id: number;
  numero: string;
  compagnie: string;
  origine: string;
  destination: string;
  dateDepart: string;
  heureDepart: string;
  dateArrivee: string;
  heureArrivee: string;
  prix: number;
  places: number;
}
