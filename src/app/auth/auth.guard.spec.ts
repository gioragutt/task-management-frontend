import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard, AuthGuardData } from './auth.guard';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Provider } from '@angular/core';

const activatedRouteSnapshot = (
  mustBeLogged: AuthGuardData['mustBeLogged'],
  routeTo: AuthGuardData['routeTo']) =>
  ({
    data: {
      authGuardData: {
        mustBeLogged,
        routeTo,
      },
    },
  }) as any as ActivatedRouteSnapshot;

const UNAUTHORIZED_ROUTE_SNAPSHOT = activatedRouteSnapshot('out', '/');
const AUTHORIZED_ROUTE_SNAPSHOT = activatedRouteSnapshot('in', '/auth/login');

describe('AuthGuard', () => {
  let authenticated: boolean;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      isAuthenticated(): Observable<boolean> {
        return of(authenticated);
      },
    } as AuthService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService } as Provider,
      ],
    });
  });

  it('should pass validation if not authenticated and should be logged out', inject([AuthGuard], async (guard: AuthGuard) => {
    authenticated = false;
    const result = await guard.canActivate(UNAUTHORIZED_ROUTE_SNAPSHOT).toPromise();
    expect(result).toBe(true);
  }));

  it('should pass validation if authenticated and should be logged in', inject([AuthGuard], async (guard: AuthGuard) => {
    authenticated = true;
    const result = await guard.canActivate(AUTHORIZED_ROUTE_SNAPSHOT).toPromise();
    expect(result).toBe(true);
  }));

  it('should not pass validation if authenticated and should be logged out', inject([AuthGuard], async (guard: AuthGuard) => {
    authenticated = true;
    const result = await guard.canActivate(UNAUTHORIZED_ROUTE_SNAPSHOT).toPromise();
    expect(result).not.toBe(true);
    expect((result as UrlTree).toString()).toBe('/');
  }));

  it('should not pass validation if not authenticated and should be logged in', inject([AuthGuard], async (guard: AuthGuard) => {
    authenticated = false;
    const result = await guard.canActivate(AUTHORIZED_ROUTE_SNAPSHOT).toPromise();
    expect(result).not.toBe(true);
    expect((result as UrlTree).toString()).toBe('/auth/login');
  }));
});
