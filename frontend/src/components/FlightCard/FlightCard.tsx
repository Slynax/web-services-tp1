import type { Flight } from '@/types/Flight'
import './FlightCard.css'

interface FlightCardProps {
  flight: Flight
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (    <div className="flight-card">
      <div className="flight-header">
        <h3 className="flight-number">{flight.numero}</h3>
        <span className="flight-company">{flight.compagnie}</span>
      </div>
      
      <div className="flight-route">
        <div className="airport">
          <span className="airport-code">{flight.origine}</span>
          <span className="airport-name">Départ</span>
        </div>
        
        <div className="flight-arrow">✈️</div>
        
        <div className="airport">
          <span className="airport-code">{flight.destination}</span>
          <span className="airport-name">Arrivée</span>
        </div>
      </div>

      <div className="flight-times">
        <div className="time">
          <span className="time-label">Départ</span>
          <span className="time-value">{formatDate(flight.heureDepart)}</span>
        </div>
        <div className="time">
          <span className="time-label">Arrivée</span>
          <span className="time-value">{formatDate(flight.heureArrivee)}</span>
        </div>
      </div>

      <div className="flight-details">
        <div className="detail">
          <span className="detail-label">Prix</span>
          <span className="detail-value">{flight.prix}€</span>
        </div>
        <div className="detail">
          <span className="detail-label">Places disponibles</span>
          <span className="detail-value">{flight.places}</span>
        </div>
      </div>
    </div>
  )
}
