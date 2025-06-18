export const fetchCallback = async (code, state) => {
    const storedCodeVerifier = sessionStorage.getItem(this.CODE_VERIFIER_KEY);
    const storedState = sessionStorage.getItem(this.STATE_KEY);

    if (!storedCodeVerifier || !storedState) {
        throw new Error('PKCE data missing');
    }

    if (state !== storedState) {
        throw new Error('Invalid state - possible CSRF attack');
    }

    try {
        const response = await fetch(`http://localhost:3000/api/v1/callback/google?state=${encodeURIComponent(state)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                code_verifier: storedCodeVerifier,
                expected_state: storedState
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Authentication error');
        }

        const data = await response.json();

        this.cleanupOAuthData();

        return data.user;
    } catch (error) {
        this.cleanupOAuthData();
        throw error;
    }
}