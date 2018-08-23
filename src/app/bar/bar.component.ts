import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { BarService } from '../bar.service';
import { Drink } from '../drink';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
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
export class BarComponent implements OnInit {

  items$:Drink[];

  constructor(private barService:BarService) { 
    this.barService.getItemsToMake().subscribe(
      data => this.items$ = data
    )
  }

  ngOnInit() {
  }

  made(madeDrink:Drink){
    madeDrink.orderedItem.ready=true;
    this.barService.itemMade(madeDrink).subscribe(
      data => this.items$ = data
    )
  }
}
