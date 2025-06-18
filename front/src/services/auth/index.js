export const initializeOAuth = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/google');
        const data = await response.json();
        console.log( 'OAuth2.1 initialization response: ', data);
        sessionStorage.setItem("oauth_code_verifier", data.codeVerifier);
        sessionStorage.setItem("oauth_state", data.state);

        return data.authUrl;
    } catch (error) {
        console.error('OAuth initialization error:', error);
        throw new Error('Unable to initialize authentication');
    }
}