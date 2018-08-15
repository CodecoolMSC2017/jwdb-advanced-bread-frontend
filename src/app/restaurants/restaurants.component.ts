import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Restaurant } from '../restaurant';
import { Address } from '../address';
import { Employee } from '../employee';
import { Profile } from '../profile';

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
  restaurants$ : Restaurant[];
  employees$ : Employee[];
  newRestaurant$ : Restaurant;
  address$ : Address = new Address();
  created$:Restaurant = new Restaurant();
  loggedIn$ : Profile;
  
  

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getRestaurants().subscribe(
      data => this.restaurants$ = data
    )
    this.data.getProfile().subscribe(
      data => this.loggedIn$ = data
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
    this.created$.address = this.address$
    this.created$.owner_id = this.user.id
    this.data.postRestaurant(this.created$).subscribe((data) => {
      this.newRestaurant$ = data,
      this.data.getRestaurants().subscribe(
        resp => this.restaurants$ = resp
      )
    });
    this.hide()
    this.address$ = new Address()
    this.created$ = new Restaurant()
  }

  delete(restaurantId){
    this.restaurants$.forEach(element => {
      if(element.id === restaurantId){
          this.restaurants$.splice(this.restaurants$.indexOf(element),1);
      }
    });
    this.data.deleteRestaurant(restaurantId).subscribe()
      
  }
}
