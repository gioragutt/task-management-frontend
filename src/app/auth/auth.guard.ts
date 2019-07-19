import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface AuthGuardData {
  mustBeLogged: 'in' | 'out';
  routeTo: string | UrlTree;
}

const getAuthGuardData = ({ data: { authGuard } }: ActivatedRouteSnapshot) => {
  if (!authGuard) {
    throw new Error(`AuthGuard must be supplied with AuthGuardData in the route data`);
  }
  return authGuard;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const { mustBeLogged, routeTo }: AuthGuardData = getAuthGuardData(next);
    const mustBeLoggedIn = mustBeLogged === 'in';

    return this.authService.isAuthenticated().pipe(
      map(authenticated => authenticated === mustBeLoggedIn),
      tap((validationPassed: boolean) =>
        console.log(`AuthGuard validation to '${next.url.toString()}' ${validationPassed ? 'passed' : 'did not pass'}`)),
      map((validationPassed: boolean) => {
        if (validationPassed) {
          return true;
        }
        if (routeTo instanceof UrlTree) {
          return routeTo;
        }
        return this.router.parseUrl(routeTo);
      }),
    );
  }
}
