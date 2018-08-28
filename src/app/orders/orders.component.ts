import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Restaurant } from '../restaurant';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
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
export class OrdersComponent implements OnInit {

  currentRestaurant$ : Restaurant;
  restaurants$ : Restaurant[];
  orders$ : any[];


  constructor(private data: DataService,private toasterService:ToasterService) { }

  ngOnInit() {
    this.data.getRestaurants().subscribe(
      data => this.restaurants$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
  }

  getOrdersByRestaurant(restaurantId){
    this.data.getOrders(restaurantId).subscribe(
      data => this.orders$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )

    this.data.getRestaurant(restaurantId).subscribe(
      data => this.currentRestaurant$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
    
  }
}
