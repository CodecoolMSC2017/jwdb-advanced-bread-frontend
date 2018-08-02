import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  employeeId: string;
  restaurantId: string;
  newEmployee$: Object;

  employee$: Object;

  created$:Object = {
    username : '',
    password : '',
    confirmationPassword : ''
  };

  constructor(private data:DataService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['employeeId'];
      this.restaurantId = params['restaurantId'];
    });
  }

  ngOnInit() {
    this.data.getRegistered(this.employeeId, this.restaurantId).subscribe(
      data => this.newEmployee$ = data
    , error => this.router.navigate(['login']));
  }

  add() {
    this.data.postUser(this.employeeId, this.created$).subscribe((data) => {
      this.employee$ = data;
      this.router.navigate(['login'])
    });
  }
}

