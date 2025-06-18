import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface GoogleUserInfo {
    email: string;
    name: string;
    picture: string;
}

interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
}

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {

        const { code, code_verifier, expected_state } = req.body;
        const { state } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'Authorization code missing' });
        }

        if (!state || !expected_state || state !== expected_state) {
            return res.status(400).json({ error: 'Invalid state - possible CSRF attack' });
        }

        if (!code_verifier) {
            return res.status(400).json({ error: 'Code verifier missing for PKCE' });
        }

        const tokenParams = new URLSearchParams({
            client_id: process.env.OAUTH_CLIENT_ID!,
            client_secret: process.env.OAUTH_SECRET!,
            code: code as string,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:5001/callback/google',
            code_verifier: code_verifier
        });

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: tokenParams.toString()
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            throw new Error(`Error during code exchange: ${tokenResponse.status} - ${errorData}`);
        }

        const tokens: TokenResponse = await tokenResponse.json();

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        });

        if (!userResponse.ok) {
            throw new Error(`Error retrieving user information: ${userResponse.status}`);
        }

        const userInfo: GoogleUserInfo = await userResponse.json();

        res.json({
            user: {
                email: userInfo.email,
                name: userInfo.name,
                photo: userInfo.picture
            }
        });


    } catch (error) {
        console.error('Detailed authentication error:', error);
        res.status(500).json({ error: 'Authentication error' });
    }
});

export default router;