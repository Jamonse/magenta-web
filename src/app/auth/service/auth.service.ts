import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_URL } from 'src/app/shared/utils/url.utils';
import { LoginResponse } from '../model/login.response';
import { UserData } from '../model/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, {
      username: email,
      password,
    });
  }

  createUserDetails(data: LoginResponse): UserData {
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
}
