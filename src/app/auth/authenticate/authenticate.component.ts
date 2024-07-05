import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
})
export class AuthenticateComponent {
  constructor(private authService: AuthService) {}

  isLoading = false;
  isLoginMode = true;
  error: string = null;

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        (response) => {
          this.isLoading = false;
          console.log(response);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
          console.log(errorMessage);
        }
      );
    } else {
      this.authService.signup(form.value.email, form.value.password).subscribe(
        (response) => {
          this.isLoading = false;
          console.log(response);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
          console.log(errorMessage);
        }
      );
    }
    form.reset();
  }
}
