import { useState, useEffect } from 'react'
import type { Flight } from '@/types/Flight'
import { FlightService } from '@/services/FlightService'
import { AuthService, type User } from '@/services/AuthService'
import FlightCard from '@/components/FlightCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import './App.css'

function App() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const fetchFlights = async () => {
    try {
      setLoading(true)
      setError(null)
      const flightsData = await FlightService.getFlights()
      setFlights(flightsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading flights')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const authUrl = await AuthService.initializeOAuth();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google login error:', error);
      setError('Connection initialization error');
    }
  }

  const handleLogout = () => {
    AuthService.clearUser();
    setUser(null);
  }

  useEffect(() => {
    fetchFlights()
    const userFromCookie = AuthService.getUser();
    setUser(userFromCookie);
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchFlights} />
  }

  return (
    <div className="app">
      <header className="app-header">        <div className="app-header-content">
          <h1>✈️ Flight Search</h1>
          <p>Find and book your next flight</p>
        </div>
        <div className="login-section">
          {user ? (
            <div className="user-info">
              {user.photo && (
                <img 
                  src={user.photo} 
                  alt={user.name || 'Profile photo'} 
                  className="user-avatar"
                />
              )}
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>          ) : (
            <GoogleLoginButton onLogin={handleGoogleLogin} />
          )}
        </div>
      </header>
      
      <main className="app-main">
        {flights.length === 0 ? (
          <div className="no-flights">
            <p>No flights available at the moment.</p>
          </div>
        ) : (
          <div className="flights-list">
            <h2>Available flights ({flights.length})</h2>
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
