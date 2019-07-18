import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardData } from './auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  data: {
    authGuard: {
      mustBeLogged: 'out',
      routeTo: '/',
    } as AuthGuardData,
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
