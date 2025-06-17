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
      return res.status(400).json({ error: 'Code d\'autorisation manquant' });
    }

    // OAuth 2.1: Validate state parameter for CSRF protection
    if (!state || !expected_state || state !== expected_state) {
      return res.status(400).json({ error: 'État invalide - possible attaque CSRF' });
    }    // OAuth 2.1: PKCE provides additional security alongside client secret for web apps
    if (!code_verifier) {
      return res.status(400).json({ error: 'Code verifier manquant pour PKCE' });
    }
      const tokenParams = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID!,
      client_secret: process.env.OAUTH_SECRET!,
      code: code as string,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:5173/callback',
      // OAuth 2.1: PKCE code verifier for additional security
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
      throw new Error(`Erreur lors de l'échange du code: ${tokenResponse.status} - ${errorData}`);
    }

    const tokens: TokenResponse = await tokenResponse.json();

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`
      }
    });

    if (!userResponse.ok) {
      throw new Error(`Erreur lors de la récupération des informations utilisateur: ${userResponse.status}`);
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
    console.error('Erreur détaillée lors de l\'authentification:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

export default router; 