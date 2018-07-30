import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
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
export class RestaurantsComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('user'));
  restaurants$ : Object;
  employees$ : Object;
  newRestaurant$ : Object;
  address$ : Object = {
    street :'',
    city:'',
    postalCode:'',
    state:'',
    country : ''
  }
  created$:Object = {
    name : '',
    email : '',
    address : this.address$, 
    phone : '',
    owner_id : this.user.id
  }
  

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getRestaurants().subscribe(
      data => this.restaurants$ = data
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

  add(){
    this.data.postRestaurant(this.created$).subscribe(
      data => this.newRestaurant$ = data
    )
    this.data.getRestaurants().subscribe(
      data => this.restaurants$ = data
    )
  }

}
