import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Table } from '../table';
import { Profile } from '../profile';
import { Restaurant } from '../restaurant';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-waiter-tables',
  templateUrl: './waiter-tables.component.html',
  styleUrls: ['./waiter-tables.component.scss'],
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
export class WaiterTablesComponent implements OnInit {

  invoiceTableId:number;
  loggedIn$:Profile;
  tables$:Table[];
  restaurantId:number;
  restaurant$:Restaurant;
  orders$: any[];

  constructor(private waiterData:WaiterService,private data:DataService,private router:ActivatedRoute,private route: Router,private toasterService:ToasterService) {
    this.router.params.subscribe( (param) => {
       this.restaurantId = param.restaurantId,
      this.data.getProfile().subscribe(
        data => this.loggedIn$ = data ,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    )}
  )}

  ngOnInit() {
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
    } 
    
    
  assign(table){
    this.waiterData.assign(table).subscribe( () =>{
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
  }

  unassign(table){
    this.waiterData.deassign(table).subscribe( () =>{
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
    })
  }

  showOrders(tableId){
    this.waiterData.getOrdersByTable(tableId).subscribe((data) => {
      this.orders$ = data,
      this.showOrderModal()
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
     
    )
  }

  createInvoice(tableId){
    this.invoiceTableId = tableId,
    this.showInvoiceModal();
  }

  showOrderModal(){
    let modal = document.getElementById("orderViewModal")
    modal.classList.remove("hidden");
  }

  hideOrderModal(){
    let modal = document.getElementById("orderViewModal")
    modal.classList.add("hidden")
  }

  showInvoiceModal(){
    let modal = document.getElementById("invoiceModal")
    modal.classList.remove("hidden");
  }


  hideInvoiceModal(){
    let modal = document.getElementById("invoiceModal")
    modal.classList.add("hidden")
  }

  takeOrder(restaurantId,tableId){
    this.route.navigate(['orders/restaurant/'+restaurantId+'/table/'+tableId]);
  }
}
