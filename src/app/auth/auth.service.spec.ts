import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http';

describe('AuthService', () => {
  const ACCESS_TOKEN = 'asd';
  let http: HttpTestingController;
  let service: AuthService;

  const expectSignInRequest = () =>
    http.expectOne(req => req.url.endsWith('signin')).flush({ accessToken: ACCESS_TOKEN });

  const signIn = () => service.signIn('username', 'password');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  afterEach(() => http.verify());

  it('should be authenticated after successful signin', () => {
    signIn().pipe(
      switchMap(() => service.isAuthenticated()),
    ).subscribe(authenticated => expect(authenticated).toBeTruthy());

    expectSignInRequest();
  });

  it('should save access token after successful signin', () => {
    signIn().pipe(
      map(() => service.accessToken),
    ).subscribe(accessToken => expect(accessToken).toBe(ACCESS_TOKEN));

    expectSignInRequest();
  });

  it('should not be authenticated after signin and signout', () => {
    signIn().pipe(
      tap(() => service.signOut()),
      switchMap(() => service.isAuthenticated()),
    ).subscribe(authenticated => expect(authenticated).toBeFalsy());

    expectSignInRequest();
  });

  it('should forget access token after signin and signout', () => {
    signIn().pipe(
      tap(() => service.signOut()),
      map(() => service.accessToken),
    ).subscribe(accessToken => expect(accessToken).toBeFalsy());

    expectSignInRequest();
  });
});
