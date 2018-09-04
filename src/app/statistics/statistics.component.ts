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

  reports$:any[];
  itemQuantityReport$:any[];
  endDate:string = "2020-01-01";
  startDate:string = "2010-01-01";
  restaurantId:number = 1;
  barChart = [];
  borderColorsArray: string[] = []
  itemsNames:string[] = []
  itemsQuantity:number[] = []

  constructor(private reportService:ReportService,private itemService:ItemService,private toasterService:ToasterService) { 
    
  }

  ngOnInit() {
    
    this.getOrdersQuantityReport()
  
  }
  getOrdersQuantityReport(){
    this.reportService.getOrdersQuantity(this.restaurantId,this.startDate,this.endDate).subscribe(
      (data)=>{
        this.itemQuantityReport$ = data
        this.loadItems(this.itemQuantityReport$);

      },
      err => this.toasterService.error("ERROR"+err.error.status,err.error.message)
    )}

    loadItems(itemsReports:any[]){
      itemsReports.forEach(element => {
        this.itemsNames.push(element.itemName)
        this.itemsQuantity.push(element.itemQuantity)
      })
      this.makeBestSellerChart();
    }
      
  makeBestSellerChart(){
    this.barChart=new Chart('barchart-bestsellers',{type: 'bar',
    data: {
    labels: this.itemsNames,
    datasets: [{
        label: ' # of sells',
        data: this.itemsQuantity,
        backgroundColor:this.randomColors(this.itemsQuantity.length),
        borderColor: this.borderColorsArray,
        borderWidth: 1
    }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes:[{
              ticks: {
                display:false
              }
            }]
        }
    }
  })
  }


  makeDailyIncomeChart(){
    this.barChart=new Chart('barchart-dailyincome',{type: 'bar',
    data: {
    labels: this.itemsNames,
    datasets: [{
        label: ' # of sells',
        data: this.itemsQuantity,
        backgroundColor:this.randomColors(this.itemsQuantity.length),
        borderColor: this.borderColorsArray,
        borderWidth: 1
    }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes:[{
              ticks: {
                display:false
              }
            }]
        }
    }
  })
  }

  randomColors(counter:number):string[]{
    let randomColors:string[] = []
    for(let i = 0;i<counter;i++){
      let color:string = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+",0.2)"
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
