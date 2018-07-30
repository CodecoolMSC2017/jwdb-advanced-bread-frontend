import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from './login-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAuth(loginDetails: LoginDetails){
    return this.http.get('/api/auth', {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password)
      })
    });
  }

  deleteAuth(): Observable<void> {
    return this.http.delete<void>('/api/auth');
  }
}
