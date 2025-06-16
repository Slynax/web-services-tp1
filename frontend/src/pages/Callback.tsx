import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { AuthService } from '@/services/AuthService';

const Callback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('Code d\'autorisation manquant');
        }

        const response = await fetch(`http://localhost:3000/api/v1/callback?code=${code}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de l\'authentification');
        }

        AuthService.setUser(data.user);

        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="callback-container">
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="callback-container">
      <LoadingSpinner />
      <p>Authentification en cours...</p>
    </div>
  );
};

export default Callback; 