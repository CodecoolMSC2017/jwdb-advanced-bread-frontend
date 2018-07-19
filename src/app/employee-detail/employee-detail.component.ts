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

  constructor(private data : DataService, private route : ActivatedRoute) {
    this.route.params.subscribe(params => this.employee$ = params.id)    
   }

  ngOnInit() {
    this.data.getUser(this.employee$).subscribe(
      data => this.employee$ = data
    )
  }

}
