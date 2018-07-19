import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('user'));
  employees$ : Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getEmployees().subscribe(
      data => this.employees$ = data
    )
  }

}
