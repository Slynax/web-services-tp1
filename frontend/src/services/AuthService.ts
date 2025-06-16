import Cookies from 'js-cookie';

export interface User {
  email: string;
  name: string;
  photo: string;
}

export class AuthService {
  private static readonly USER_COOKIE = 'user_info';
  private static readonly COOKIE_EXPIRES = 7;

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