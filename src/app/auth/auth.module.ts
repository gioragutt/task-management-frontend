import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider, Type } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { CredentialsFormComponent } from './credentials-form/credentials-form.component';
import { ExpiredJwtInterceptor } from './expired-jwt.interceptor';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const provideInterceptor = <T extends HttpInterceptor>(type: Type<T>): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: type,
  multi: true,
});

export const AUTH_PROVIDERS: Provider[] = [
  provideInterceptor(AuthorizationInterceptor),
  provideInterceptor(ExpiredJwtInterceptor),
];

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    CredentialsFormComponent,
    AuthShellComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
