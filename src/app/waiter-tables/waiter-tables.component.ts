import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-waiter-tables',
  templateUrl: './waiter-tables.component.html',
  styleUrls: ['./waiter-tables.component.scss']
})
export class WaiterTablesComponent implements OnInit {

  loggedIn$:Object;
  tables$:Object;
  restaurantId:Object;

  constructor(private route:ActivatedRoute,private waiterData:WaiterService,private data:DataService,private router:ActivatedRoute) {
    this.router.params.subscribe(
      param => this.restaurantId = param.restaurantId
    )
   }

  ngOnInit() {
    this.data.getProfile().subscribe((data) =>{ 
      this.loggedIn$ = data,
      this.waiterData.getTables(this.restaurantId).subscribe(
        data => this.tables$ = data
      )
    }
    )
    
  }
}
