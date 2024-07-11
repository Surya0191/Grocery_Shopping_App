import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
})
export class AuthenticateComponent implements OnDestroy{
  constructor(private authService: AuthService, private router:Router) {}

  isLoading = false;
  isLoginMode = true;
  error: string = null;

  authSubscription:Subscription

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authSubscription = this.authService.login(form.value.email, form.value.password).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    } else {
      this.authSubscription = this.authService.signup(form.value.email, form.value.password).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    }
    form.reset();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
