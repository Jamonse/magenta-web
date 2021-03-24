import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_URL,
} from 'src/app/shared/utils/url.util';
import { UserData } from '../model/user-data.model';
import { User } from '../model/user.model';

export const LOCAL_STORAGE_USER = 'user';
export const LOCAL_STORAGE_JWT = 'jwt';
export const LOCAL_STORAGE_RT = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserData> {
    return this.http.post<UserData>(LOGIN_URL, {
      username: email,
      password,
    });
  }

  logout() {
    // Send refresh token to API on logout
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_RT);
    this.clearLocalStorage();
    return this.http.post(LOGOUT_URL, refreshToken);
  }

  refreshToken(refreshToken: string): Observable<string> {
    return this.http.post<string>(REFRESH_URL, refreshToken);
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
      case 'RECONNECT':
        return 'Please reconnect to the system';
      default:
        return 'An unexpected error occured, please try again later';
    }
  }

  saveUserInLocalStorage(userData: UserData): void {
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userData.user));
    localStorage.setItem(LOCAL_STORAGE_JWT, userData.jwt);
    localStorage.setItem(LOCAL_STORAGE_RT, userData.refreshToken);
  }

  updateLocalStorageJwt(jwt: string): void {
    localStorage.setItem(LOCAL_STORAGE_JWT, jwt);
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

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
