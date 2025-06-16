import { useState, useEffect } from 'react'
import type { Flight } from '@/types/Flight'
import { FlightService } from '@/services/FlightService'
import FlightCard from '@/components/FlightCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import './App.css'

function App() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFlights = async () => {
    try {
      setLoading(true)
      setError(null)
      const flightsData = await FlightService.getFlights()
      setFlights(flightsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des vols')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFlights()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchFlights} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ Recherche de Vols</h1>
        <p>Trouvez et réservez votre prochain vol</p>
      </header>
      
      <main className="app-main">
        {flights.length === 0 ? (
          <div className="no-flights">
            <p>Aucun vol disponible pour le moment.</p>
          </div>
        ) : (
          <div className="flights-list">
            <h2>Vols disponibles ({flights.length})</h2>
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
