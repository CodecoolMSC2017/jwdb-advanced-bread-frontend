import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Table } from '../table';
import { Seat } from '../seat';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
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
export class SeatsComponent implements OnInit {

  tableId : number;
  restaurantId : number;
  table$ : Table;
  seats$ : Seat[];
  newSeats$ : Seat[];
  numOfSeats : number = 0;
  created$ : Seat = new Seat();

  constructor(private route: ActivatedRoute, private data: DataService,private toasterService:ToasterService) {
    this.route.params.subscribe( params => this.tableId = params.tableId)
    this.route.params.subscribe( params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getSeats(this.tableId).subscribe(data => this.seats$ = data,
      error => this.toasterService.error('ERROR '+error.error.status,error.error.message))

    this.data.getTable(this.restaurantId,this.tableId).subscribe(data => this.table$ = data,
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
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
    this.data.postSeats(this.tableId, this.created$,this.numOfSeats).subscribe((data) => {
      this.seats$ = data
      this.toasterService.success(data.length+' seats added')
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message));
    this.hide();
    this.numOfSeats = 0;
    this.created$ = new Seat();
  }

  delete(tableId,seatId){
    this.seats$.forEach(element => {
      if(element.id === seatId){
        this.seats$.splice(this.seats$.indexOf(element),1)
      }
    });
    this.data.deleteSeat(tableId,seatId).subscribe(()=>{
      this.toasterService.success('Seat deleted')
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
  }
}
