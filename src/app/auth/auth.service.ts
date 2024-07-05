import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorMessage } from './error-message.enum';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWnSVX1XjzrXjAzM7X8Zek7MCLQrzFyYc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error occured!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          if (ErrorMessage[errorResponse.error.error.message]) {
            errorMessage = ErrorMessage[errorResponse.error.error.message];
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWnSVX1XjzrXjAzM7X8Zek7MCLQrzFyYc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error occured!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          if (ErrorMessage[errorResponse.error.error.message]) {
            errorMessage = ErrorMessage[errorResponse.error.error.message];
          }
          return throwError(errorMessage);
        })
      );
  }
}
