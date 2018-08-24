import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';
import { ItemService } from '../item.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { $ } from 'jquery';


@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
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
export class MenuItemsComponent implements OnInit {

  
  menuId:number;
  currentMenu$:Menu;
  addableItems$:Item[];
  restaurantId:number;
  showableContentIds = new Array<number>();
  searchString:string = '';
  accent_letters = {'á':'a','é':'e','í':'i','ó':'o','ö':'o','ő':'o','ú':'u','ü':'u','ű':'u'}
  

  constructor( private menuService:MenuService,private itemService:ItemService,private route:ActivatedRoute) {
    this.route.params.subscribe(
      (params) => {
        this.menuId = params.menuId
        this.restaurantId = params.restaurantId 
      });
    this.menuService.getMenu(this.menuId).subscribe(
      data => this.currentMenu$ = data
    )
    this.getAddableItems()
  }

  ngOnInit() {
  }


  addItem(item:Item){
    this.menuService.addNewItemToMenu(this.menuId,item).subscribe(
      data => this.currentMenu$ = data)
    this.addableItems$.splice(this.addableItems$.indexOf(item),1);
  }

  getAddableItems(){
    this.itemService.getAddableItems(this.restaurantId,this.menuId).subscribe(
      data => this.addableItems$ = data
    )
  }

  delete(itemId){
    this.itemService.getById(itemId).subscribe(
      data => this.addableItems$.push(data)
    )
    this.currentMenu$.items.forEach(element => {
      if(element.id === itemId){
        this.currentMenu$.items.splice(this.currentMenu$.items.indexOf(element),1)
      }
    });
    this.menuService.deleteItemFromMenu(this.menuId,itemId).subscribe()
  }

  showIngredients(itemId:number){
    this.showableContentIds.push(itemId)
    this.displayContent()
  }

  displayContent(){
    this.currentMenu$.items.forEach(element => {
      if(this.showableContentIds.includes(element.id)){
        for(let i = 0; i<document.getElementsByClassName(element.id.toString()).length;i++){
          document.getElementsByClassName(element.id.toString()).item(i).classList.remove('hidden');
        }
        
          
      }
      else{
        if(document.getElementsByClassName(element.id.toString())!== null){
          for(let i = 0;i<document.getElementsByClassName(element.id.toString()).length;i++){
            document.getElementsByClassName(element.id.toString()).item(i).classList.add('hidden');
          }
          
        }
        
      }
    });
  }

  hideIngredients(itemId:number){
    this.showableContentIds.splice(this.showableContentIds.indexOf(itemId),1)
    this.displayContent();

  }

  containsShowable(itemId:number):boolean{
    if(this.showableContentIds.includes(itemId)){
      return true;
    }
    return false;
  }

  show():void{
      let button = document.getElementById("myModal")
      button.classList.remove("hidden");
      document.body.style.overflow = 'hidden';

  }

  hide():void{
    let button = document.getElementById("myModal")
    button.classList.add("hidden");
    document.body.style.overflow = 'visible';
    
  }

  includeString(item:Item):boolean{
    let category:string = this.accent_floding(item.category.toLocaleLowerCase());
    let subcategory:string = this.accent_floding(item.subcategory.toLocaleLowerCase());
    let name:string = this.accent_floding(item.name.toLocaleLowerCase());
        
    if(this.searchString === ''){
      return true;
    }
    if (name.includes(this.searchString.toLocaleLowerCase()) || subcategory.includes(this.searchString.toLocaleLowerCase()) || category.includes(this.searchString.toLocaleLowerCase())){
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

}
