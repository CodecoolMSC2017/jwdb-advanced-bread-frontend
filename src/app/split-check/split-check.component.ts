import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Restaurant } from '../restaurant';
import { element } from 'protractor';
import { Seat } from '../seat';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-split-check',
  templateUrl: './split-check.component.html',
  styleUrls: ['./split-check.component.scss']
})
export class SplitCheckComponent implements OnInit {

  seats$:Seat[];
  seatIds=new Array<number>();
  tableId:number;
  invoice$:Object;
  alreadyPaid=new Array<number>();
  

  constructor(private waiterService:WaiterService, private dataService:DataService, private route:ActivatedRoute,private router:Router,private toasterService:ToasterService) { 
    this.route.params.subscribe(
      params => this.tableId = params.tableId
    )
  }

  ngOnInit() {
    this.dataService.getSeats(this.tableId).subscribe(
      data => this.seats$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message) 
    )
  }

  createInvoice(){
    this.waiterService.splitInvoice(this.seatIds).subscribe(
      data => this.invoice$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message) 
    )
    
  }


  addSeatToInvoice(seatId:number){
    if(this.seatIds.includes(seatId)){
      this.seatIds.splice(this.seatIds.indexOf(seatId),1)
    }
    else{
    this.seatIds.push(seatId)
    }
    }

  isActive(seatId:number):boolean{
    if(this.seatIds.includes(seatId)){
      return true;
    }
  
  return false;
  }

  pay(invoice){
    this.waiterService.pay(invoice).subscribe(() => {
      this.showNotifyModal()
      this.invoice$ = null;
    }
      
    )
    
  }

  showNotifyModal(){
    let modal = document.getElementById("notifyModal")
    modal.classList.remove("hidden")
  }

  hideNotifyModal(){
    let modal = document.getElementById("notifyModal")
    modal.classList.add("hidden")
    
    this.seatIds.forEach(element => {
      this.alreadyPaid.push(element)
    });
    this.seatIds=new Array<number>();
    if(this.isEveryOrderPaid()){
      this.router.navigate(['/my-orders'])
    }
  }
  isAlreadyPayed(seatId){
    if(this.alreadyPaid.includes(seatId)){
      return true;
    }
  return false;
  }

  isEveryOrderPaid():boolean{
    if(this.alreadyPaid.length === this.seats$.length){
      for(let i = 0;i<this.alreadyPaid.length; i++){
      if(!this.alreadyPaid.includes(this.seats$[i].id)){
        return false;
      }
    }
    return true;
  } 
  return false;
  }
   
    
}
