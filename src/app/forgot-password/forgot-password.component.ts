import { User } from './../user';
import { DataService } from './../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Send } from '../send';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  response$: any;

  userSend$: Send;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  sendEmail() { 
    this.data.sendEmail(this.userSend$).subscribe(data => {
      this.response$ = data;
      alert('Email sent');
      this.router.navigate(['login']);
    }, error => {
      alert(error.error.message);
    });
  }

}