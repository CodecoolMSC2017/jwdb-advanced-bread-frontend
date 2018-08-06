import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { OrderItem } from '../order-item';

@Component({
  selector: 'app-take-orders',
  templateUrl: './take-orders.component.html',
  styleUrls: ['./take-orders.component.scss']
})
export class TakeOrdersComponent implements OnInit {

  activeMenu$:Object;
  seats$:Object;
  orders$:Object;
  tableId:Object;
  loggedIn$:any;
  restaurantId: Object;
  newOrder$:Object;

  constructor(private route:ActivatedRoute,private data:DataService,private waiterService: WaiterService) {
    this.route.params.subscribe(
      params => this.tableId = params.tableId
    )
    this.route.params.subscribe(
      params => this.restaurantId = params.restaurantId
    )
    this.data.getSeats(this.tableId).subscribe(
      data => this.seats$ = data
    )
    this.data.getProfile().subscribe(
      data => this.loggedIn$ = data
    )    
    this.data.getActiveMenu(this.restaurantId).subscribe(
      data => this.activeMenu$ = data
    )
   }

  ngOnInit() {
    
  }

  takeNewOrder(itemId:number,quantity:number,comment:string){
    let orderItem = new OrderItem();
    orderItem.itemId=itemId;
    orderItem.comment=comment;
    orderItem.quantity=quantity;

    
    this.waiterService.takeOrder(11,orderItem).subscribe(
        data => this.newOrder$ = data
    )
    }
    
  

}
