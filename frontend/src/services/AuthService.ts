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

  static async initializeOAuth(): Promise<string> {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/google');
      const data = await response.json();
      
      sessionStorage.setItem(this.CODE_VERIFIER_KEY, data.codeVerifier);
      sessionStorage.setItem(this.STATE_KEY, data.state);
      
      return data.authUrl;
    } catch (error) {
      console.error('OAuth initialization error:', error);
      throw new Error('Unable to initialize authentication');
    }
  }

  static async handleCallback(code: string, state: string): Promise<User> {
    const storedCodeVerifier = sessionStorage.getItem(this.CODE_VERIFIER_KEY);
    const storedState = sessionStorage.getItem(this.STATE_KEY);
    
    if (!storedCodeVerifier || !storedState) {
      throw new Error('PKCE data missing');
    }
    
    if (state !== storedState) {
      throw new Error('Invalid state - possible CSRF attack');
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
      console.error('User cookie parsing error:', error);
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