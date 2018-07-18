import { Injectable } from '@angular/core';
import { RegisterDetails } from './register-details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(registerDetails: RegisterDetails): Observable<void> {
    return this.http.post<void>('/api/register', {
      username: registerDetails.username,
      email: registerDetails.email,
      password: registerDetails.password,
      confirmationPassword: registerDetails.confirmationPassword
    });
  }
}
