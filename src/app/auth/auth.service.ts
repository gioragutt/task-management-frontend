import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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

  signUp(username: string, password: string): Observable<{}> {
    return this.authRequest('signup', username, password);
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    return this.authRequest<SignInResponse>('signin', username, password).pipe(
      tap(response => this.saveAccessToken(response)),
    );
  }

  private saveAccessToken({ accessToken }: SignInResponse): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, accessToken);
  }

  private authRequest<T>(path: string, username: string, password: string): Observable<T> {
    return this.http.post<T>(`http://localhost:3000/auth/${path}`, JSON.stringify({ username, password }));
  }

  signOut() {
    this.removeAccessToken();
  }

  private removeAccessToken(): void {
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.accessToken);
  }
}
