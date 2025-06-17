import type { Flight } from '@/types/Flight'
import AirlineLogo from '@/components/AirlineLogo'
import './FlightCard.css'

interface FlightCardProps {
  flight: Flight
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  return (    <div className="flight-card">      <div className="flight-header">
        <h3 className="flight-number">{flight.number}</h3>
        <div className="flight-company">
          <AirlineLogo airline={flight.airline} size="small" />
          <span className="company-name">{flight.airline}</span>
        </div>
      </div>
      
      <div className="flight-route">
        <div className="airport">
          <span className="airport-code">{flight.origin}</span>
          <span className="airport-name">Departure</span>
        </div>
        
        <div className="flight-arrow">✈️</div>
        
        <div className="airport">
          <span className="airport-code">{flight.destination}</span>
          <span className="airport-name">Arrival</span>
        </div>
      </div>      <div className="flight-times">
        <div className="time">
          <span className="time-label">Departure</span>
          <span className="time-value">{formatDateTime(flight.departureTime)}</span>
        </div>
        <div className="time">
          <span className="time-label">Arrival</span>
          <span className="time-value">{formatDateTime(flight.arrivalTime)}</span>
        </div>
      </div>

      <div className="flight-details">
        <div className="detail">
          <span className="detail-label">Price</span>
          <span className="detail-value">{flight.price}€</span>
        </div>
        <div className="detail">
          <span className="detail-label">Available seats</span>
          <span className="detail-value">{flight.seats}</span>
        </div>
      </div>
    </div>
  )
}
