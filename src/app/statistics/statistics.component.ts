import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ToasterService } from '../toaster.service';
import { element } from 'protractor';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  items:Item[];
  reports$:any[];
  itemQuantityReport$:any[];
  endDate:string = "2020-01-01";
  startDate:string = "2010-01-01";
  restaurantId:number = 1;
  chart = [];

  constructor(private reportService:ReportService,private itemService:ItemService,private toasterService:ToasterService) { 
    
  }

  ngOnInit() {
  }
  getOrdersQuantityReport(){
    this.reportService.getOrdersQuantity(this.restaurantId,this.startDate,this.endDate).subscribe(
      (data)=>{
        this.itemQuantityReport$ = data

      },
      err => this.toasterService.error("ERROR"+err.error.status,err.error.message)
    )}

    loadItems(itemsReports:any[]){
      itemsReports.forEach(element=>{
        this.itemService.getById(element.itemId).subscribe(data=> this.items.push(data),err=> this.toasterService.error("ERROR "+err.error.status,err.error.message));
      })

      this.chart=new Chart("canvas",{
        labels:["1","2"],
        datasets:[

        ],


      })
    }
}
