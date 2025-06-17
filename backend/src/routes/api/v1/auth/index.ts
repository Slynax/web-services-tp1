import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Helper function to generate code verifier for PKCE
function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url');
}

// Helper function to generate code challenge from verifier
function generateCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

// Helper function to generate secure random state
function generateState(): string {
  return crypto.randomBytes(16).toString('hex');
}

router.get('/google', (req: Request, res: Response) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  // OAuth 2.1 PKCE implementation
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  // Store code verifier and state temporarily (in production, use secure storage like Redis)
  // For this demo, we'll return them to the client to store temporarily
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID!,
    redirect_uri: 'http://localhost:5173/callback',
    response_type: 'code',
    scope: scopes.join(' '),
    state: state,
    // PKCE parameters (OAuth 2.1 requirement)
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    // Security improvements
    access_type: 'online',
    prompt: 'consent'
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  // Return auth URL along with code verifier and state for OAuth 2.1 PKCE flow
  res.json({ 
    authUrl,
    codeVerifier,
    state
  });
});

export default router; 