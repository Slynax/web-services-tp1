import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoadingSpinner} from '../../../components/LoadingSpinner';
import { ErrorMessage } from '../../../components/ErrorMessage';
import {fetchCallback} from "../../../services/callback/google";
import Cookies from 'js-cookie';

export const Callback = () => {
    const [error, setError] = useState(null);
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

                console.log('Callback received code:', code);
                const user = await fetchCallback(code, state);
                console.log('User data received:', user);
                Cookies.set(this.USER_COOKIE, JSON.stringify(user), {
                    expires: this.COOKIE_EXPIRES,
                    secure: false,
                    sameSite: 'lax'
                });

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