import Cookies from 'js-cookie';

export interface User {
  email: string;
  name: string;
  photo: string;
}

export class AuthService {
  private static readonly USER_COOKIE = 'user_info';
  private static readonly CODE_VERIFIER_KEY = 'oauth_code_verifier';
  private static readonly STATE_KEY = 'oauth_state';
  private static readonly COOKIE_EXPIRES = 7;
  // OAuth 2.1: Store PKCE parameters securely
  static async initializeOAuth(): Promise<string> {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/google');
      const data = await response.json();
      
      // Store PKCE parameters from backend response
      sessionStorage.setItem(this.CODE_VERIFIER_KEY, data.codeVerifier);
      sessionStorage.setItem(this.STATE_KEY, data.state);
      
      return data.authUrl;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation OAuth:', error);
      throw new Error('Impossible d\'initialiser l\'authentification');
    }
  }
  // OAuth 2.1: Handle callback with PKCE verification
  static async handleCallback(code: string, state: string): Promise<User> {
    const storedCodeVerifier = sessionStorage.getItem(this.CODE_VERIFIER_KEY);
    const storedState = sessionStorage.getItem(this.STATE_KEY);
    
    if (!storedCodeVerifier || !storedState) {
      throw new Error('Données PKCE manquantes');
    }
    
    if (state !== storedState) {
      throw new Error('État invalide - possible attaque CSRF');
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/v1/callback?state=${encodeURIComponent(state)}`, {
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
        throw new Error(errorData.error || 'Erreur d\'authentification');
      }
      
      const data = await response.json();
      
      // Clean up PKCE data
      this.cleanupOAuthData();
      
      return data.user;
    } catch (error) {
      this.cleanupOAuthData();
      throw error;
    }
  }

  private static cleanupOAuthData(): void {
    sessionStorage.removeItem(this.CODE_VERIFIER_KEY);
    sessionStorage.removeItem(this.STATE_KEY);
  }

  static setUser(user: User): void {
    Cookies.set(this.USER_COOKIE, JSON.stringify(user), {
      expires: this.COOKIE_EXPIRES,
      secure: false,
      sameSite: 'lax'
    });
  }

  static getUser(): User | null {
    const userCookie = Cookies.get(this.USER_COOKIE);
    if (!userCookie) {
      return null;
    }

    try {
      return JSON.parse(userCookie) as User;
    } catch (error) {
      console.error('Erreur lors du parsing du cookie utilisateur:', error);
      this.clearUser();
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  static clearUser(): void {
    Cookies.remove(this.USER_COOKIE);
  }
} 