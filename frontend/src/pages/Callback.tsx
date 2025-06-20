import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { AuthService } from '@/services/AuthService';

const Callback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code) {
          throw new Error('Authorization code missing');
        }

        if (!state) {
          throw new Error('State missing');
        }

        const user = await AuthService.handleCallback(code, state);
        AuthService.setUser(user);

        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
      <p>Authentication in progress...</p>
    </div>
  );
};

export default Callback; 