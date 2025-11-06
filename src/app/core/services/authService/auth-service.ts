import { inject, Injectable } from '@angular/core';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, LoggedInUser } from '../../../models/auth-models/user.model';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  // private readonly baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private readonly baseUrl = environment.nodeApiURL;
  private readonly http = inject(HttpClient);
  private userDetails: any;
  private route = inject(Router);

  public login(user: LoggedInUser): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/authentication/signin`, user)
      .pipe(tap((response) => this.setLoggedInUser(response)));
  }

  public signup(newUser: User): Observable<LoggedInUser> {
    return this.http
      .post<LoggedInUser>(`${this.baseUrl}/authentication/signup`, newUser)
      .pipe(tap((response) => this.setLoggedInUser(response)));
  }

  private setLoggedInUser(authResponse: any) {
    const expiresAt = moment().add(authResponse.expiresIn, 'second');

    localStorage.setItem('user_token', authResponse.token);
    localStorage.setItem('refresh_token', authResponse.refreshToken);
    localStorage.setItem(
      'token_expiration',
      JSON.stringify(expiresAt.valueOf())
    );
    localStorage.setItem('user_details', JSON.stringify(authResponse.user));
  }
  public getUserDetails() {
    return JSON.parse(localStorage.getItem('user_details') || '');
  }

  public getRefreshToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/refresh`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
      },
    });
  }

  public logout() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('user_details');
    localStorage.removeItem('refresh_token');
    this.route.navigate(['/auth/login']);
  }

  public isLoggedIn() {
    return (
      moment().isBefore(this.getExpiration()) ||
      !!localStorage.getItem('user_token')
    );
  }

  public getExpiration() {
    const expiration = localStorage.getItem('token_expiration') || '0';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
