import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Restaurant } from '../restaurant';
import { Table } from '../table';
import { ToasterService } from '../toaster.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
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
export class TablesComponent implements OnInit {

  restaurantId : number;
  restaurant$ : Restaurant;
  tables$ : Table[];
  orders$ : any[];
  newTable$ : Table;
  created$ : Table = new Table();


  constructor(private data: DataService, private route: ActivatedRoute,private toasterService:ToasterService) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getTables(this.restaurantId).subscribe(
      data => this.tables$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
    this.data.getRestaurant(this.restaurantId).subscribe(
      data => this.restaurant$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
  }

  show():void{
    let button = document.getElementById("myModal")
    button.classList.remove("hidden");
  }

  hide():void{
    let button = document.getElementById("myModal")
    button.classList.add("hidden");
  }

  add(){
    this.data.postTable(this.restaurantId, this.created$).subscribe((data) => {
      this.newTable$ = data,
      this.data.getTables(this.restaurantId).subscribe(
        resp => this.tables$ = resp,
        error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      )
    },
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message));
    this.hide();
    this.created$ = new Table();
  }

  delete(restaurantId,tableId){
    this.tables$.forEach(element => {
      if(element.id === tableId){
          this.tables$.splice(this.tables$.indexOf(element),1);
      }
    });
    this.data.deleteTable(restaurantId,tableId).subscribe(()=>{
      this.toasterService.success('table','deleted')
    })
  }
}
