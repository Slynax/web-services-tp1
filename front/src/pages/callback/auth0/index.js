import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

export const Callback = () => {
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState('');
    
    // Retour à useAuth0 de base pour diagnostiquer
    const { 
        user, 
        isLoading, 
        error: authError,
        isAuthenticated 
    } = useAuth0();
    
    const navigate = useNavigate();

    // Debug : afficher l'état en temps réel
    useEffect(() => {
        const info = `
        isLoading: ${isLoading}
        isAuthenticated: ${isAuthenticated}
        hasUser: ${!!user}
        userEmail: ${user?.email || 'N/A'}
        authError: ${authError?.message || 'N/A'}
        URL: ${window.location.href}
        hasCode: ${new URLSearchParams(window.location.search).has('code')}
        hasState: ${new URLSearchParams(window.location.search).has('state')}
        `;
        setDebugInfo(info);
        console.log('Auth0 Callback State:', { 
            isLoading, 
            isAuthenticated, 
            user, 
            authError,
            url: window.location.href,
            urlParams: Object.fromEntries(new URLSearchParams(window.location.search))
        });
    }, [isLoading, isAuthenticated, user, authError]);

    // Logique de redirection simplifiée
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log('✅ Utilisateur authentifié, redirection vers /', user.email);
            navigate('/');
        } else if (authError) {
            console.error('❌ Erreur Auth0:', authError);
            setError(authError.message);
        }
    }, [isAuthenticated, user, authError, navigate]);

    // Timeout de sécurité
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.warn('⏰ Timeout de sécurité après 5 secondes');
            if (isAuthenticated && user) {
                navigate('/');
            } else {
                setError('Timeout - Redirection échouée');
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [isAuthenticated, user, navigate]);

    if (error) {
        return (
            <div className="callback-container">
                <div className="error">
                    ❌ {error}
                    <button onClick={() => window.location.reload()}>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="callback-container" style={{ padding: '20px', fontFamily: 'monospace' }}>
            <Loading />
            <h2>🔍 Debug Callback Auth0</h2>
            <pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
                {debugInfo}
            </pre>
            
            <div style={{ marginTop: '20px' }}>
                <p>🔄 Authentification en cours...</p>
                {isAuthenticated && <p>✅ Authentifié!</p>}
                {user && <p>👤 Utilisateur: {user.name || user.email}</p>}
                {isLoading && <p>⏳ Chargement Auth0...</p>}
            </div>
            
            <button 
                onClick={() => {
                    console.log('Force redirect clicked');
                    navigate('/');
                }}
                style={{ marginTop: '20px', padding: '10px' }}
            >
                🚀 Forcer la redirection
            </button>
        </div>
    );
};

export default Callback;