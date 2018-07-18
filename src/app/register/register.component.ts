import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { RegisterDetails } from '../register-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerDetails: RegisterDetails = new RegisterDetails();

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.registerService.register(this.registerDetails).subscribe(user => {
      this.router.navigate(['login']);
    }, error => alert(error.message));
  }
}
