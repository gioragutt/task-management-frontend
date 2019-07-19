import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Credentials } from '../credentials.model';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
})
export class CredentialsFormComponent {
  @Output() credentials = new EventEmitter<Credentials>();

  credentialsForm = this.fb.group({
    username: [null, Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])],
    password: [null, Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
    ])],
  });

  get username(): AbstractControl {
    return this.credentialsForm.controls.username;
  }

  get password(): AbstractControl {
    return this.credentialsForm.controls.password;
  }

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.credentials.emit(this.credentialsForm.value);
  }
}
