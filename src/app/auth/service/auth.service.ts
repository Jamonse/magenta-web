import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LOGIN_URL, LOGOUT_URL } from 'src/app/shared/utils/url.utils';
import { UserData } from '../model/user-data.model';

export const LOCAL_STORAGE_USER_DATE = 'user';

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
    this.logoutSubscription = this.http.post(LOGOUT_URL, null).subscribe();
    localStorage.removeItem(LOCAL_STORAGE_USER_DATE);
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
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUserFromLocalStorage(): UserData | null {
    const userDataPayload: string | null = localStorage.getItem(
      LOCAL_STORAGE_USER_DATE
    );
    if (userDataPayload) {
      const userData: any = JSON.parse(userDataPayload);
      const user: UserData = {
        user: {
          id: userData.user.id,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          email: userData.user.email,
          phoneNumber: userData.user.phoneNumber,
          preferedTheme: userData.user.preferedTheme,
          permissions: userData.user.permissions,
        },
        jwt: userData.jwt,
        refreshToken: userData.refreshToken,
      };
      return user;
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }
}
