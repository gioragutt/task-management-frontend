import { Component, OnInit } from '@angular/core';
import { Credentials } from '../credentials.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(private authService: AuthService, private router: Router) { }

  signIn(credentials: Credentials) {
    this.authService.signIn(credentials).subscribe(() => this.router.navigate(['.']));
  }
}
