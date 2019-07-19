import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Credentials } from './credentials.model';

export interface SignInResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly ACCESS_TOKEN = 'ACCESS_TOKEN';

  constructor(private http: HttpClient) { }

  get accessToken(): string {
    return localStorage.getItem(AuthService.ACCESS_TOKEN);
  }

  signUp(credentials: Credentials): Observable<{}> {
    return this.authRequest('signup', credentials);
  }

  signIn(credentials: Credentials): Observable<SignInResponse> {
    return this.authRequest<SignInResponse>('signin', credentials).pipe(
      tap(response => this.saveAccessToken(response)),
    );
  }

  private saveAccessToken({ accessToken }: SignInResponse): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, accessToken);
  }

  private authRequest<T>(path: string, { username, password }: Credentials): Observable<T> {
    return this.http.post<T>(`http://localhost:3000/auth/${path}`, { username, password });
  }

  signOut(): Observable<void> {
    return defer(() => {
      this.removeAccessToken();
      return of(undefined);
    });
  }

  private removeAccessToken(): void {
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.accessToken);
  }
}
