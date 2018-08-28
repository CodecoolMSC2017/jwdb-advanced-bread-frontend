import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../menu';
import { Item } from '../item';
import { Ingredient } from '../ingredient';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
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
export class MenusComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('user'));
  restaurantId: number;
  menus$: Menu[];
  menu$: Menu;
  newMenu$: Menu;
  items$: Item[];
  allItems$: Item[];
  ingredients$: Ingredient[];
  created$ = new Menu();


  constructor(private data: DataService, private route: ActivatedRoute,private toasterService:ToasterService) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
  }

  ngOnInit() {
    this.data.getMenus(this.restaurantId).subscribe(
      data => this.menus$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
  }

  show() {
    let button = document.getElementById("itemModal")
    button.classList.remove("hidden");
  }

  showAdd() {
    this.getAllItems(this.restaurantId);
    let button = document.getElementById("addItemModal")
    button.classList.remove("hidden");
  }

  hideAdd() {
    let button = document.getElementById("addItemModal")
    button.classList.add("hidden");
  }

  hide() {
    let button = document.getElementById("itemModal")
    button.classList.add("hidden");
  }

  add() {
    for(let i = 0; i < this.allItems$.length; i++) {
      if(this.allItems$[i].value == true) {
        this.created$.items.push(this.allItems$[i]);
      }
    }
    this.data.postMenu(this.created$).subscribe((data) => {
      this.newMenu$ = data,

      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      this.data.getMenus(this.restaurantId).subscribe(
        data => this.menus$ = data,
        error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      )
    });
    this.hideAdd();
    this.created$ = new Menu;
  }

  delete(menuId) {
    this.data.deleteMenu(menuId).subscribe(() => {
      this.data.getMenus(this.restaurantId).subscribe(
        data => this.menus$ = data,
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      )
    }
    )
  }
  getItemsByMenu(menuId) {
    this.data.getItemsByMenu(menuId).subscribe((data) => {
      this.items$ = data,
        this.data.getMenu(menuId).subscribe((data) => {
          this.menu$ = data,
            this.show()
        },
        error => this.toasterService.error('ERROR '+error.error.staus,error.error.message))
    },
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message))
  }
  getIngredientsByItemId(itemId, restaurantId, menuId) {
    this.data.getIngredientsByItemId(itemId, restaurantId).subscribe((data) => {
      this.ingredients$ = data,
       this.data.getItemsByMenu(menuId).subscribe((data) => {
        this.items$ = data,
          this.data.getMenu(menuId).subscribe((data) => {
            this.menu$ = data,
              this.show()
          },
          error => this.toasterService.error('ERROR '+error.error.staus,error.error.message))
      },
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message))
    },
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message))
  }

  activate(restaurantId,menu){
    this.data.changeMenuActivity(restaurantId,menu).subscribe(() => {
      this.data.getMenus(restaurantId).subscribe(
        data => this.menus$ = data,
        error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      )
      this.toasterService.success(menu.title+' Activated')
    },
    error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
      
    
    )
  }

  deactivate(restaurantId,menu){
    this.data.changeMenuActivity(restaurantId,menu).subscribe(
      () => {
        
        this.data.getMenus(restaurantId).subscribe(
          data => this.menus$ = data,
          error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
        )
        this.toasterService.success(menu.title+' Deactivated')
      },
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    );
  }

  getAllItems(restaurantId) {
    this.data.getAllItems(restaurantId).subscribe(
      data => this.allItems$ = data,
      error => this.toasterService.error('ERROR '+error.error.staus,error.error.message)
    )
  }
}
