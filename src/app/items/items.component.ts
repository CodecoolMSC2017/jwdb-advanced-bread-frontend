import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { element } from 'protractor';
import { ToasterService } from '../toaster.service';


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
  searchString:string = '';
  accent_letters = {'á':'a','é':'e','í':'i','ó':'o','ö':'o','ő':'o','ú':'u','ü':'u','ű':'u'}

  constructor(private route:ActivatedRoute, private itemService:ItemService,private restaurantService:RestaurantService,private toasterService:ToasterService) {
    this.route.params.subscribe((params)=> {
      this.restaurantId = params.restaurantId
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        data => this.restaurant$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
      itemService.getAllItems(this.restaurantId).subscribe(
        data => this.items$ = data,
        error => this.toasterService.error('ERROR '+error.error.status,error.error.message)
      )
    })
   }

  ngOnInit() {
  }


  addItem(){
    if(!this.newItem.subcategory){
      this.newItem.subcategory = '-';
    }
    this.itemService.postItem(this.newItem,this.restaurantId).subscribe((data) => {
      this.items$.push(data),
      this.toasterService.success('Item added to '+this.restaurant$.name)
    },
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
    this.newItem = new Item();
    this.hide()
  }

  deleteItem(itemId:number){
    this.items$.forEach(element => {
      if(element.id === itemId){
        this.items$.splice(this.items$.indexOf(element),1)
        
      }
    });
    this.itemService.deleteItem(this.restaurantId,itemId).subscribe(() => {this.toasterService.success('Item deleted')},
    error => this.toasterService.error('ERROR '+error.error.status,error.error.message))
  }

  includeString(item:Item):boolean{
    let category:string = this.accent_floding(item.category.toLocaleLowerCase());
    let subcategory:string = this.accent_floding(item.subcategory.toLocaleLowerCase());
    let name:string = this.accent_floding(item.name.toLocaleLowerCase());
    let searchString = this.accent_floding(this.searchString);
        
    if(searchString === ''){
      return true;
    }
    if (name.includes(searchString.toLocaleLowerCase()) || subcategory.includes(searchString.toLocaleLowerCase()) || category.includes(searchString.toLocaleLowerCase())){
      return true
    }
    else {
      return false;
    }
    
  }

  accent_floding(accented_string:string){
    if (!accented_string) { return ''; }
    var ret = '';
    for (var i = 0; i < accented_string.length; i++) {
      ret += this.accent_letters[accented_string.charAt(i)] || accented_string.charAt(i);
    }
    return ret;
  }

  show():void{
    this.newItem.restaurant = this.restaurant$;
    this.newItem.category = "FOOD"
    let button = document.getElementById("myModal")
    button.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
    this.newItem.category = "FOOD"
    

}

hide():void{
  let button = document.getElementById("myModal")
  button.classList.add("hidden");
  document.body.style.overflow = 'visible';
  
}
}
