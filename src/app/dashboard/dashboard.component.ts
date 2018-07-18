import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { NewUser } from '../new-user';
import { PasswordChange } from '../password-change';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  users: User[] = [];
  passwordChange: PasswordChange = new PasswordChange();
  newUser: NewUser = new NewUser();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  deleteAuth() {
    const clearAuth = () => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    };
    this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  changePassword() {
    this.userService.changePassword(this.passwordChange).subscribe(console.log);
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(console.log);
  }
}
