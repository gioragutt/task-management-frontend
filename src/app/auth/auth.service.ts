import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuthenticated(): Observable<boolean> {
    return of(true);
  }
}
