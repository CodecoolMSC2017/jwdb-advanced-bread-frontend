import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { OrderItem } from '../order-item';
import { Menu } from '../menu';
import { Seat } from '../seat';
import { Profile } from '../profile';
import { PreviousRouteService } from '../previous-route.service';
import { Item } from '../item';

@Component({
  selector: 'app-take-orders',
  templateUrl: './take-orders.component.html',
  styleUrls: ['./take-orders.component.scss']
})
export class TakeOrdersComponent implements OnInit {

  activeMenu$:Menu;
  seats$:Seat[];
  orders$:any[];
  tableId:number;
  loggedIn$:Profile;
  restaurantId: number;
  newOrder$:any;
  seatId:number;
  searchString:string = '';
  accent_letters = {'á':'a','é':'e','í':'i','ó':'o','ö':'o','ő':'o','ú':'u','ü':'u','ű':'u'}
  

  constructor(private route:ActivatedRoute,private data:DataService,private waiterService: WaiterService,private router:Router,private prevoiusRoute:PreviousRouteService) {
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
    
   }

  ngOnInit() {
    this.data.getActiveMenu(this.restaurantId).subscribe(
      data => this.activeMenu$ = data
    )
  }

  takeNewOrder(itemId:number,quantity:number,comment:string){
    let orderItem = new OrderItem();
    orderItem.itemId=itemId;
    orderItem.comment=comment;
    orderItem.quantity=quantity;

    this.waiterService.takeOrder(this.seatId,orderItem).subscribe((data) =>{
      this.newOrder$ = data,
      this.waiterService.getOrdersBySeat(this.seatId).subscribe(
        data => this.orders$ = data
      )
    }
       
    )
  }

  chooseSeat(seatId:number){
    this.seatId=seatId;
    this.getOrdersBySeat(seatId)
  }

  getOrdersBySeat(seatId){
    this.waiterService.getOrdersBySeat(seatId).subscribe(
      data => this.orders$ = data
    )
  }

  deleteOrder(orderItemId){
    this.waiterService.deleteOrder(this.seatId,orderItemId).subscribe(()=>{
      this.waiterService.getOrdersBySeat(this.seatId).subscribe(data=> this.orders$ = data)
    }
      
    )
  }

  includeString(item:Item):boolean{
    let category:string = this.accent_floding(item.category.toLocaleLowerCase());
    let subcategory:string = this.accent_floding(item.subcategory.toLocaleLowerCase());
    let name:string = this.accent_floding(item.name.toLocaleLowerCase());
    let searchString = this.accent_floding(this.searchString);
        
    if(searchString === ''){
      return true;
    }
    if (name.includes(searchString.toLocaleLowerCase()) || subcategory.includes(searchString.toLocaleLowerCase()) || category.includes(searchString.toLocaleLowerCase())){
      return true
    }
    else {
      return false;
    }
    
  }
  accent_floding(accented_string:string){
    if (!accented_string) { return ''; }
    var ret = '';
    for (var i = 0; i < accented_string.length; i++) {
      ret += this.accent_letters[accented_string.charAt(i)] || accented_string.charAt(i);
    }
    return ret;
  }

  goBack(){
    this.router.navigate([this.prevoiusRoute.getPreviousUrl()])
  }
  
    
  

}
