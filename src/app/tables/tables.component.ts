import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


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

  restaurantId : Object;
  restaurant$ : Object;
  tables$ : Object;


  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
   }

  ngOnInit() {
    this.data.getTables(this.restaurantId).subscribe(
      data => this.tables$ = data
    )
    this.data.getRestaurant(this.restaurantId).subscribe(
      data => this.restaurant$ = data
    )
    
  }
}
