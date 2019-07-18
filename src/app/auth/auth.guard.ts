import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface AuthGuardData {
  mustBeLogged: 'in' | 'out';
  routeTo: string | UrlTree;
}

const getAuthGuardData = ({ data: { authGuardData } }: ActivatedRouteSnapshot) => {
  if (!authGuardData) {
    throw new Error(`AuthGuard must be supplied with AuthGuardData in the route data`);
  }
  return authGuardData;
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
