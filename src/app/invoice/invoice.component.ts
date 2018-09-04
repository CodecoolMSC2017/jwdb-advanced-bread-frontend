import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { ToasterService } from '../toaster.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaypalinvoiceService } from '../paypalinvoice.service';
import { PaypalItem } from '../paypal-item';
import { element } from 'protractor';
import { UnitPrice } from '../unit-price';
import { Tax } from '../tax';
import { DomSanitizer } from '@angular/platform-browser';
declare let paypal:any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{

  invoice$: any;
  tableId:number;
  addSctript:boolean = false;
  paypalInvoice$:any;
  base64Image:string;
  access_token:string = environment.access_token

  constructor(private waiterService: WaiterService,private route:ActivatedRoute,private router: Router,private toasterService:ToasterService, private paypal:PaypalinvoiceService, private _DomSanitizationService: DomSanitizer) {
      this.route.params.subscribe(
        params => this.tableId = params.tableId
      )
      
      
   }

  ngOnInit() {
    this.waiterService.createInvoice(this.tableId).subscribe(
      (data) => {
        this.invoice$ = data
        /*this.paypal.getAccessToken().subscribe((data) => {
          this.access_token = data.access_token
        })*/
        this.paypalInvoiceGen(this.access_token)
      },
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
  }

  pay(invoice){
    this.waiterService.pay(invoice).subscribe(() => {
      this.showNotifyModal()
    },
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message) 
    )
  }

  showNotifyModal(){
    let modal = document.getElementById("notifyModal")
    modal.classList.remove("hidden")
  }

  hideNotifyModal(){
    let modal = document.getElementById("notifyModal")
    modal.classList.add("hidden")
    this.router.navigate(['/my-orders'])
  }

  paypalInvoiceGen(access_token:string){
    this.paypal.createInvoice(this.makePayPalItems(),access_token).subscribe(
      (data) => {
        this.paypalInvoice$ = data,
        this.paypal.senInvoice(this.paypalInvoice$.id,access_token).subscribe(() => {
          this.paypal.getQr(this.paypalInvoice$.id,access_token).subscribe(
          data => this.base64Image = 'data:image/png;base64, '+data.image
          ,
          
          err => this.toasterService.error('Error '+err.error.status,err.error.message)
        )}
          
      )
        },
      err => this.toasterService.error('Error '+err.error.status,err.error.message)
    )
  }


  makePayPalItems():PaypalItem[]{
    let paypalItems :PaypalItem[] = [] 
    this.invoice$.invoiceItemDtos.forEach(element => {
      let paypalItem = new PaypalItem();
      paypalItem.unit_price = new UnitPrice()
      paypalItem.tax = new Tax()
      paypalItem.name = element.itemName
      paypalItem.quantity = element.quantity
      paypalItem.unit_price.currency = "HUF"
      paypalItem.unit_price.value = (element.unitPrice).toString()
      paypalItem.tax.name = "Tax"
      paypalItem.tax.percent = 0
      paypalItems.push(paypalItem)
    });
    return paypalItems;
  }

}
