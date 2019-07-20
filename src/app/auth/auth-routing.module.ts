import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, loggedOutOrRedirectTo } from './auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthShellComponent } from './auth-shell/auth-shell.component';

const routes: Routes = [{
  path: '',
  component: AuthShellComponent,
  canActivate: [AuthGuard],
  data: {
    authGuard: loggedOutOrRedirectTo('/'),
  },
  children: [
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
