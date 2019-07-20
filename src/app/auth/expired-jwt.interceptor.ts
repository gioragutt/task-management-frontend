import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMapTo } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ExpiredJwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err && err.status !== 401) {
        return throwError(err);
      }
      console.log('[ExpiredJwtInterceptor] Access Token expired, signing out');
      return this.authService.signOut().pipe(
        tap(() => this.router.navigateByUrl('/auth/signin')),
        switchMapTo(throwError(err)),
      );
    }));
  }
}
