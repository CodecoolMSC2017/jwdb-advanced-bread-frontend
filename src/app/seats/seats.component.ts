import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

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

  tableId : Object;
  restaurantId : Object;
  table$ : Object;
  seats$ : Object;
  newSeat$ : Object;
  numOfSeats : Object;
  created$ : Object = {
    table : this.table$
  }

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.tableId = params.tableId)
    this.route.params.subscribe( params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getSeats(this.tableId).subscribe(data => this.seats$ = data)

    this.data.getTable(this.restaurantId,this.tableId).subscribe(data => this.table$ = data)
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
    for(let i = 0; i < this.numOfSeats; i++) {
      this.data.postSeat(this.tableId, this.created$).subscribe((data) => {
        this.newSeat$ = data,
        this.data.getSeats(this.tableId).subscribe(
          resp => this.seats$ = resp
        )
      });
    }
    this.hide();
    this.numOfSeats = ''
    this.created$ = {table : ''}
  }
}
