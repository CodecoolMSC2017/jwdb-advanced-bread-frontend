import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { ToasterService } from '../toaster.service';

declare let paypal:any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit,AfterViewChecked {

  invoice$: any;
  tableId:number;
  addSctript:boolean = false;

  paypalConfig = {
    env: 'sandbox',
    client : {
      sandbox: 'AUXwUE4OX3-lc6N6GVZzIe-r_IZVoltBZX0DwT84Qs3MThL3YPASOeU-n_KeYtSc-XQfCbnQc4MmMtCZ'
      },
      commit:true,
      payment : (data, actions) => {
        return actions.payment.create({
          payment :{
            transactions: [
              {amount: {
                total: this.invoice$.totalPrice ,
                currency: 'HUF'
              },
              description:'Restaurant Reciept'
              }
            ]
          }
        })
      },
      onAuthorize : (data, actions) => {
        return actions.payment.execute().then((payment)=> {
          this.pay(this.invoice$)
          this.showNotifyModal()
        })
      }
      }




  constructor(private waiterService: WaiterService,private route:ActivatedRoute,private router: Router,private toasterService:ToasterService) {
      this.route.params.subscribe(
        params => this.tableId = params.tableId
      )
      
   }

  ngOnInit() {
    this.waiterService.createInvoice(this.tableId).subscribe(
      data => this.invoice$ = data,
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

  ngAfterViewChecked():void{
    if(!this.addSctript){
      this.addPayPalScript().then(()=> {
        paypal.Button.render(this.paypalConfig,'#paypal-checkout-button')
      })
    }
  }

  addPayPalScript(){
this.addSctript=true;
return new Promise((resolve,reject)=>{
  let scriptTagElement = document.createElement('script')
  scriptTagElement.src="https://www.paypalobjects.com/api/checkout.js"
  scriptTagElement.onload = resolve
  document.body.appendChild(scriptTagElement)
})
  }

}
