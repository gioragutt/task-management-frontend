import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const AUTHORIZATION_HEADER = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth') && this.authService.accessToken) {
      console.log(`[AuthorizationInterceptor] ${req.method} ${req.url}`);
      req = req.clone({
        setHeaders: {
          [AUTHORIZATION_HEADER]: `Bearer ${this.authService.accessToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
