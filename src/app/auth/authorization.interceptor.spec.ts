import { TestBed } from '@angular/core/testing';

import { AuthorizationInterceptor, AUTHORIZATION_HEADER } from './authorization.interceptor';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Authorization.InterceptorService', () => {
  let accessToken: string;
  let httpVerifier: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authService = {
      get accessToken() {
        return accessToken;
      },
    } as AuthService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
          multi: true,
        },
      ],
    });

    httpVerifier = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should not change request if auth url', () => {
    httpClient.post('/auth/login', {}).subscribe(() => expect().nothing());

    const request = httpVerifier.expectOne(req => req.url.includes('auth')).request;
    expect(request.headers.has(AUTHORIZATION_HEADER)).toBeFalsy();
  });

  it('should not change request if no access token is available', () => {
    httpClient.get('/tasks').subscribe(() => expect().nothing());

    const request = httpVerifier.expectOne(req => req.url.includes('auth')).request;
    expect(request.headers.has(AUTHORIZATION_HEADER)).toBeFalsy();
  });

  it('should change request if access token is available', () => {
    accessToken = 'TOKEN';
    httpClient.post('/auth/login', {}).subscribe(() => expect().nothing());

    const request = httpVerifier.expectOne(req => req.url.includes('auth')).request;
    expect(request.headers.get(AUTHORIZATION_HEADER)).toBe(`Bearer ${accessToken}`);
  });
});
