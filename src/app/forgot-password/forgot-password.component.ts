import { User } from './../user';
import { DataService } from './../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  response$: any;

  user$: any;

  userSend$: any = {
    email: ''
  };

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  /*
  checkIfExists() {
    this.data.getUser(this.userSend$).subscribe(data => {
      this.user$ = data;
    }, error => {
      alert(error.error.message);
    });
  }
  */

  sendEmail() {
    // this.checkIfExists();
    this.data.sendEmail(this.userSend$).subscribe(data => {
      this.response$ = data;
      alert('Email sent');
      this.router.navigate(['login']);
    }, error => {
      alert(error.error.message);
    });
  }

}