import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees$ : Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getEmployees().subscribe(
      data => this.employees$ = data
    )
  }

}
