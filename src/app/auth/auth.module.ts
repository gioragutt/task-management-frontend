import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CredentialsFormComponent } from './credentials-form/credentials-form.component';
import { SharedModule } from '../shared/shared.module';
import { AuthShellComponent } from './auth-shell/auth-shell.component';

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
