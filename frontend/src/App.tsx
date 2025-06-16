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

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth 2.1 login
    console.log('Google OAuth 2.1 login will be implemented here')
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
        <div className="app-header-content">
          <h1>✈️ Recherche de Vols</h1>
          <p>Trouvez et réservez votre prochain vol</p>
        </div>
        <div className="login-section">
          <button onClick={handleGoogleLogin} className="login-button">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Se connecter
          </button>
        </div>
      </header>
      
      <main className="app-main">
        {flights.length === 0 ? (
          <div className="no-flights">
            <p>Aucun vol disponible pour le moment.</p>
          </div>        ) : (
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
