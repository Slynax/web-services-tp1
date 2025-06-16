import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const oauth2Client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_SECRET,
  'http://localhost:3000/callback'
);

router.get('/', async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Code d\'autorisation manquant' });
    }

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const { access_token, refresh_token, expiry_date } = tokens;

    console.log("access_token : ", access_token);
    res.json({
      success: true,
      access_token,
      refresh_token,
      expiry_date
    });
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

export default router; 