import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { element } from 'protractor';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
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
export class ItemsComponent implements OnInit {

  items$:Item[];
  restaurant$:Restaurant;
  restaurantId:number;
  newItem :Item = new Item();

  constructor(private route:ActivatedRoute, private itemService:ItemService,private restaurantService:RestaurantService) {
    this.route.params.subscribe((params)=> {
      this.restaurantId = params.restaurantId
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        data => this.restaurant$ = data
      )
      itemService.getAllItems(this.restaurantId).subscribe(
        data => this.items$ = data
      )
    })
   }

  ngOnInit() {
  }


  addItem(){
    this.itemService.postItem(this.newItem,this.restaurantId).subscribe(data => this.items$.push(data))
  }

  deleteItem(itemId:number){
    this.items$.forEach(element => {
      if(element.id === itemId){
        this.items$.splice(this.items$.indexOf(element),1)
      }
    });
    this.itemService.deleteItem(this.restaurantId,itemId).subscribe()
  }
}
