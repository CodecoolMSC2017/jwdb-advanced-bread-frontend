import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoice$: Object;
  tableId:Object;

  constructor(private waiterService: WaiterService,private route:ActivatedRoute) {
      this.route.params.subscribe(
        params => this.tableId = params.tableId
      )
   }

  ngOnInit() {
    this.waiterService.createInvoice(this.tableId).subscribe(
      data => this.invoice$ = data
    )
  }

  pay(invoice){
    this.waiterService.pay(invoice).subscribe()
  }

}
