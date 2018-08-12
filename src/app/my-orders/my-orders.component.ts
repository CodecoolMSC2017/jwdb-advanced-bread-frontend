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
  allTables$:Table[];
  myTables:Table[];
  loggedIn$:Profile;
  showableTableId= new Array<number>();
  invoiceTableId:number;
  

  constructor(private dataService: DataService, private waiterService: WaiterService,private route:Router) {
    this.dataService.getProfile().subscribe((data) => {
        this.loggedIn$ = data
        this.waiterService.getTables().subscribe((data) => {
          this.allTables$ = data
          this.myTables = this.getMyTables();
        }
    )
    }  
    )}

    

  ngOnInit() {
    
  }

  getOrdersByTable(tableId){
    this.waiterService.getOrdersByTable(tableId).subscribe(
      data => this.myTables = data
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
  showContent(tableId:number){
    this.showableTableId.push(tableId)
    this.displayContent()
  }

  displayContent(){
    this.myTables.forEach(element => {
      if(this.showableTableId.includes(element.id)){
          document.getElementById(element.id.toString()).classList.remove('hidden');
      }
      else{
        document.getElementById(element.id.toString()).classList.add('hidden');
      }
    });
  }

  hideContent(tableId:number){
    this.showableTableId.splice(this.showableTableId.indexOf(tableId),1)
    this.displayContent();

  }

  containsShowable(tableId):boolean{
    if(this.showableTableId.includes(tableId)){
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
