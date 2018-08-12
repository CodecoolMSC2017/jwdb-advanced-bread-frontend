import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Employee } from '../employee';
import { Address } from '../address';
import { Restaurant } from '../restaurant';


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

  restaurantId : number;
  employees$ : Employee[];
  restaurant$ : Restaurant;
  newEmployee$ : Employee;
  emailResponse$:Object;
  address$ : Address = new Address();
  created$ : Employee = new Employee();
  


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
    this.created$.address = this.address$;
    this.data.postEmployee(this.restaurantId, this.created$).subscribe((data) =>{ 
      this.newEmployee$ = data,
      this.hide(),
      this.address$ = new Address()
      this.created$ = new Employee()
      this.data.getEmployeesByRestaurant(this.restaurantId).subscribe(
      data => this.employees$ = data
    )}
    
  )}

  delete(restaurantId,employeeId){
    this.data.deleteEmployee(restaurantId,employeeId).subscribe(()=>{
      this.data.getEmployeesByRestaurant(restaurantId).subscribe(
        data => this.employees$ = data
      )
    })
  }
}