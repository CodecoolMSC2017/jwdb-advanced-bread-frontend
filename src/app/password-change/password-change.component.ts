import { PasswordChange } from './../password-change';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  userId: string;
  username: string;
  inputPw: string;
  inputConfirm: string;

  newUser: User;

  passwordChange = new PasswordChange();

  responseUser: User;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.username = params['username'];
    });
  }

  ngOnInit() {
    this.data.getUser(this.userId, this.username).subscribe((data) => {
      this.newUser = data,
      this.passwordChange.username = this.newUser.username;
      this.passwordChange.authorities = this.newUser.authorities;
    }, error => this.router.navigate(['login']));
  }

  changePassword() {
    this.data.changePassword(this.userId, this.passwordChange).subscribe(data => {
      this.responseUser = data;
      alert('Successful password change!');
      this.router.navigate(['login']);
    });

    /*
    , error => {
      alert(error.error.message);
    }
    */
  }
}