import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

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
  restaurantId: Object;
  menus$: Object;
  menu$: Object;
  newMenu$: Object;
  deleted$: Object;
  items$: Object;
  ingredients$: Object;
  created$: Object = {
    title: ''
  }


  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.restaurantId = params.restaurantId)
  }

  ngOnInit() {
    this.data.getMenus(this.restaurantId).subscribe(
      data => this.menus$ = data
    )
    console.log(this.menus$)
  }

  show() {
    let button = document.getElementById("itemModal")
    console.log(button)
    button.classList.remove("hidden");
  }

  hide() {
    let button = document.getElementById("itemModal")
    button.classList.add("hidden");
  }

  add() {
    this.data.postMenu(this.restaurantId, this.created$).subscribe((data) => {
      this.newMenu$ = data,
        this.data.getMenus(this.restaurantId).subscribe(
          resp => this.menus$ = resp
        )
    });
    this.hide();
    this.created$ = { title: '' }
  }

  delete(menuId) {
    this.data.deleteMenu(menuId).subscribe(() => {
      this.data.getMenus(this.restaurantId).subscribe(
        data => this.menus$ = data
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
        })
    })
  }
  getIngredientsByItemId(itemId, restaurantId, menuId) {
    this.data.getIngredientsByItemId(itemId, restaurantId).subscribe((data) => {
      this.ingredients$ = this.data.getItemsByMenu(menuId).subscribe((data) => {
        this.items$ = data,
          this.data.getMenu(menuId).subscribe((data) => {
            this.menu$ = data,
              this.show()
          })
      })
    })
  }

  activate(restaurantId,menu){
    this.data.changeMenuActivity(restaurantId,menu).subscribe(() => {
      this.data.getMenus(restaurantId).subscribe(
        data => this.menus$ = data
      )
    }
      
    
    )
  }

  deactivate(restaurantId,menu){
    this.data.changeMenuActivity(restaurantId,menu).subscribe(
      () => {
        this.data.getMenus(restaurantId).subscribe(
          data => this.menus$ = data
        )
      }
    );
  }
}
