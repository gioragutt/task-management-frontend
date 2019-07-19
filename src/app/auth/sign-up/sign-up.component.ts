import { Component } from '@angular/core';
import { Credentials } from '../credentials.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  signUp(credentials: Credentials) {
    this.errorMessage = '';
    this.authService.signUp(credentials).subscribe(
      () => this.router.navigateByUrl('/auth/signin'),
      ({ error: { message } }) => {
        this.errorMessage = message;
      });
  }
}
