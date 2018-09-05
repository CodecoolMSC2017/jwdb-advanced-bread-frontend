import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Employee } from '../employee';
import { Address } from '../address';
import { Restaurant } from '../restaurant';
import { Profile } from '../profile';
import { ToasterService } from '../toaster.service';


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
  loggedIn$ : Profile;
  


  constructor(private data: DataService, private route: ActivatedRoute, private toasterService:ToasterService) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getEmployeesByRestaurant(this.restaurantId).subscribe(
      data => this.employees$ = data,
      error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    )
    this.data.getRestaurant(this.restaurantId).subscribe(
      data => this.restaurant$ = data,
      error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    )

    this.data.getProfile().subscribe(
      data => this.loggedIn$ = data,
      error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
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
      this.toasterService.success('Employee created')
      this.hide(),
      this.address$ = new Address()
      this.created$ = new Employee()
      this.data.getEmployeesByRestaurant(this.restaurantId).subscribe(
      data => this.employees$ = data
    )},
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    
  )}

  delete(restaurantId,employeeId){
    this.data.deleteEmployee(restaurantId,employeeId).subscribe(()=>{
      this.toasterService.success('Employee deleted')
      this.data.getEmployeesByRestaurant(restaurantId).subscribe(
        data => this.employees$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
  }
}