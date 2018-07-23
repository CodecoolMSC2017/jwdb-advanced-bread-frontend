import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class EmployeeComponent implements OnInit {

  resaturantId : Object;
  employees$ : Object;
  restaurant$ : Object;


  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.resaturantId = params.id)
   }

  ngOnInit() {
    this.data.getEmployeesByRestaurant(this.resaturantId).subscribe(
      data => this.employees$ = data
    )
    this.data.getRestaurant(this.resaturantId).subscribe(
      data => this.restaurant$ = data
    )
    
  }
}
