export interface Flight {
    id: number;
    numero: string;
    compagnie: string;
    origine: string;
    destination: string;
    heureDepart: string; // ISO format (ex: "2023-10-01T10:00:00Z")
    heureArrivee: string;
    prix: number;
    places: number;
  }