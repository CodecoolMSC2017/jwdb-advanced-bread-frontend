import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { LoginDetails } from '../login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails: LoginDetails = new LoginDetails();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getAuth() {
    this.authService.getAuth(this.loginDetails).subscribe(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['dashboard']);
    }, error => alert(error.message));
  }
}
