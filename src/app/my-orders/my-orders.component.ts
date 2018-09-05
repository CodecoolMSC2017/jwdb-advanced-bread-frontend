import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { WaiterService } from '../waiter.service';
import { Table } from '../table';
import { Employee } from '../employee';
import { Profile } from '../profile';
import { element } from 'protractor';
import { ToasterService } from '../toaster.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
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
export class MyOrdersComponent implements OnInit {
  tables$:Table;
  allTables$:Table[];
  myTables:Table[];
  loggedIn$:Profile;
  showableContentIds= new Array<number>();
  invoiceTableId:number;
  

  constructor(private dataService: DataService, private waiterService: WaiterService,private route:Router, private toasterService:ToasterService) {
    this.dataService.getProfile().subscribe((data) => {
        this.loggedIn$ = data,
        this.waiterService.getTables().subscribe((data) => {
          this.allTables$ = data,
          this.myTables = this.getMyTables();
          if(this.myTables.length === 0){
            this.toasterService.warning('No tables','Assign yourself to a table first!')
          }
        },
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    )
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message) 
    )}

    

  ngOnInit() {
    
  }

  getOrdersByTable(tableId){
    this.waiterService.getOrdersByTable(tableId).subscribe(
      data => this.myTables = data,
      error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
    )
  }

  getMyTables():Table[]{
    let myTables = new Array<Table>();
    this.allTables$.forEach(element => {
      if(element.employee !== null && element.employee.user.id === this.loggedIn$.user.id){
        myTables.push(element);
      }
    });
    return myTables;
  }
  showContent(seatDtoId:number){
    this.showableContentIds.push(seatDtoId)
    this.displayContent()
  }

  displayContent(){
    this.myTables.forEach(element => {
      if(this.showableContentIds.includes(element.id)){
        for(let i = 0; i<document.getElementsByClassName(element.id.toString()).length;i++){
          document.getElementsByClassName(element.id.toString()).item(i).classList.remove('hidden');
        }
        
          
      }
      else{
        if(document.getElementsByClassName(element.id.toString())!== null){
          for(let i = 0;i<document.getElementsByClassName(element.id.toString()).length;i++){
            document.getElementsByClassName(element.id.toString()).item(i).classList.add('hidden');
          }
          
        }
        
      }
    });
  }

  hideContent(tableId:number){
    this.showableContentIds.splice(this.showableContentIds.indexOf(tableId),1)
    this.displayContent();

  }

  containsShowable(seatDtoId):boolean{
    if(this.showableContentIds.includes(seatDtoId)){
      return true;
    }
    return false;
  }

  createInvoice(tableId){
    this.invoiceTableId = tableId,
    this.showInvoiceModal();
  }

  showInvoiceModal(){
    let modal = document.getElementById("invoiceModal")
    modal.classList.remove("hidden");
  }


  hideInvoiceModal(){
    let modal = document.getElementById("invoiceModal")
    modal.classList.add("hidden")
  }

  takeOrder(tableId){
    this.route.navigate(['orders/restaurant/'+this.loggedIn$.restaurantId+'/table/'+tableId]);
  }
}
