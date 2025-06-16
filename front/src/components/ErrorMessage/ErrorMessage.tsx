import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Erreur de chargement</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Réessayer
        </button>
      )}
    </div>
  )
}
