import './LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading flights...</p>
    </div>
  )
}
