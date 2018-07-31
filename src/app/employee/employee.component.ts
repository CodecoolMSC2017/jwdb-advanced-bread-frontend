import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
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

  restaurantId : Object;
  employees$ : Object;
  restaurant$ : Object;
  newEmployee$ : Object;
  emailResponse$:Object;
  address$ : Object = {
    street :'',
    city:'',
    postalCode:'',
    state:'',
    country : ''
  }
  created$ : Object = {
    email : '',
    firstName : '', 
    lastName : '',
    role : '',
    restaurant : this.restaurant$,
    address : this.address$
  }


  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getEmployeesByRestaurant(this.restaurantId).subscribe(
      data => this.employees$ = data
    )
    this.data.getRestaurant(this.restaurantId).subscribe(
      data => this.restaurant$ = data
    )
  }

  show():void{
    let button = document.getElementById("myModal")
    button.classList.remove("hidden");
  }

  hide():void{
    let button = document.getElementById("myModal")
    button.classList.add("hidden");
  }

  add(email){
    this.data.postEmployee(this.restaurantId, this.created$).subscribe((data) => {
      this.newEmployee$ = data,
        this.data.sendEmail(email).subscribe(
        resp => this.emailResponse$ = resp 
      ),
      this.data.getEmployees().subscribe(
      data => this.employees$ = data
    )
    } 
    )
  }
}