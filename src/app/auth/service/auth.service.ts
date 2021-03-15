import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LOGIN_URL, LOGOUT_URL } from 'src/app/shared/utils/url.utils';
import { UserData } from '../model/user-data.model';
import { User } from '../model/user.model';

export const LOCAL_STORAGE_USER = 'user';
export const LOCAL_STORAGE_JWT = 'jwt';
export const LOCAL_STORAGE_RT = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  logoutSubscription!: Subscription;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserData> {
    return this.http.post<UserData>(LOGIN_URL, {
      username: email,
      password,
    });
  }

  logout(): void {
    // Send refresh token to API on logout
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_RT);
    this.logoutSubscription = this.http
      .post(LOGOUT_URL, refreshToken)
      .subscribe();
    // Clear local storage
    localStorage.clear();
  }

  createUserDetails(data: UserData): UserData {
    return {
      user: data.user,
      jwt: data.jwt,
      refreshToken: data.refreshToken,
    };
  }

  getErrorMessage(message: string): string {
    switch (message) {
      case 'INVALID_CREDENTIALS':
        return 'Either email or password are invalid';
      default:
        return 'An unexpected error occured, please try again later';
    }
  }

  saveUserInLocalStorage(userData: UserData): void {
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userData.user));
    localStorage.setItem(LOCAL_STORAGE_JWT, JSON.stringify(userData.jwt));
    localStorage.setItem(
      LOCAL_STORAGE_RT,
      JSON.stringify(userData.refreshToken)
    );
  }

  getUserFromLocalStorage(): UserData | null {
    const userString = localStorage.getItem(LOCAL_STORAGE_USER);
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_RT);
    if (userString && jwt && refreshToken) {
      const user: User = JSON.parse(userString);
      const userData: UserData = {
        user: user,
        jwt: jwt,
        refreshToken: refreshToken,
      };
      return userData;
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }
}
