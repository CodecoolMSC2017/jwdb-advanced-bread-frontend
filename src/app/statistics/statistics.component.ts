import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  items:Item[];
  reports$:any[];


  constructor(private reportService:ReportService,private itemService:ItemService) { 
    this.reportService.getOrdersQuantity()
  }

  ngOnInit() {
  }

}
