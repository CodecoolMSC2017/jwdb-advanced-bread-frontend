import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee$ : Object;
  restaurantId$ : Object;

  constructor(private data : DataService, private route : ActivatedRoute) {
    this.route.params.subscribe(params => this.employee$ = params.employeeId)
    this.route.params.subscribe(params => this.restaurantId$ = params.restaurantId)   
  
   }

  ngOnInit() {
   this.data.getEmployee(this.restaurantId$,this.employee$).subscribe(
      data => this.employee$ = data
    )
  }

}
