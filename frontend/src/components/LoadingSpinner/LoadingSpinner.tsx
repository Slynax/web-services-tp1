import './LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Chargement des vols...</p>
    </div>
  )
}
