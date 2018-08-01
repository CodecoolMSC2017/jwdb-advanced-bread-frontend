import { Component, OnInit } from '@angular/core';
import { WaiterService } from '../waiter.service';
import { ActivatedRoute } from '@angular/router'; 
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-waiter-tables',
  templateUrl: './waiter-tables.component.html',
  styleUrls: ['./waiter-tables.component.scss'],
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
export class WaiterTablesComponent implements OnInit {

  loggedIn$:Object;
  tables$:Object;
  restaurantId:Object;
  restaurant$:Object;

  constructor(private route:ActivatedRoute,private waiterData:WaiterService,private data:DataService,private router:ActivatedRoute) {
    this.router.params.subscribe( (param) => {
       this.restaurantId = param.restaurantId,
      this.data.getProfile().subscribe(
        data => this.loggedIn$ = data 
    )}
  )}

  ngOnInit() {
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data
        
      )
    } 
    
    
  assign(table){
    this.waiterData.assign(table).subscribe( () =>{
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data
      )
    })
  }

  unassign(table){
    this.waiterData.deassign(table).subscribe( () =>{
      this.waiterData.getTables().subscribe(
        data => this.tables$ = data
      )
    })
  }

  showUnassignButton(){
    let unassignButton = document.getElementById("unassign")
    unassignButton.classList.remove("hidden")
  }
  showAssignButton(){
    let assignButton = document.getElementById("assign")
    assignButton.classList.remove("hidden")
  }
  hideDeassignButton(){
    let unassignButton = document.getElementById("unassign")
    unassignButton.classList.add("hidden")
  }
  hideAssignButton(){
    let assignButton = document.getElementById("assign")
    assignButton.classList.add("hidden")
  }

}
