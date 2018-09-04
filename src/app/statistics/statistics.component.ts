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
  barChart = [];
  borderColorsArray: string[]

  constructor(private reportService:ReportService,private itemService:ItemService,private toasterService:ToasterService) { 
    
  }

  ngOnInit() {
    this.loadItems(this.itemQuantityReport$);
    this.getOrdersQuantityReport()
  }
  getOrdersQuantityReport(){
    this.reportService.getOrdersQuantity(this.restaurantId,this.startDate,this.endDate).subscribe(
      (data)=>{
        this.itemQuantityReport$ = data

      },
      err => this.toasterService.error("ERROR"+err.error.status,err.error.message)
    )}

    loadItems(itemsReports:any[]){
      /*itemsReports.forEach(element=>{
        this.itemService.getById(element.itemId).subscribe(data=> this.items.push(data),err=> this.toasterService.error("ERROR "+err.error.status,err.error.message));
      })*/

      this.barChart=new Chart('barchart',{
       type:'bar',
       data:{
         labels:["Red","Blue","Yellow","Green","Purple","Orange"],
         datasets:[{
          label:'# of votes',
          data:[9,7,3,5,2,10],
          backgroundColor:this.randomColors(6),
          borderColor:this.borderColorsArray,
          borderWidth:1
         }],
         options:{
           title:{
             text:"Bar chart",
             display:true
           },
           scales:{
             yAxes:[{
               ticks:{
                 beginAtZesro:true
               }
             }]
           }
         }
       }
      })
    }

  randomColors(counter:number):string[]{
    let randomColors:string[] = []
    for(let i = 0;i<counter;i++){
      let color:string = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+",0.2)"
      randomColors.push(color)
    }
    this.borderColors(randomColors)
    return randomColors
  }

  borderColors(colors:string[]){
    let borderColors : string[] = []
    colors.forEach(element => {
      borderColors.push(element.replace("0.2","1"))
    })
    console.log(borderColors)
    this.borderColorsArray = borderColors
    
  }
}
