import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from './menu';
import { Item } from './item';



@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  addNewItemToMenu(menuId:number,item:Item):Observable<Menu>{
    return this.http.put<Menu>('api/'+menuId+'item',item)
  }

  getMenus(restaurantId:number):Observable<Menu[]>{
    return this.http.get<Menu[]>("api/menu/restaurant/"+restaurantId);
  }

  getMenu(menuId:number):Observable<Menu> {
    return this.http.get<Menu>("api/menu/"+menuId);
  }

  postMenu(menu:Menu):Observable<Menu>{
    return this.http.post<Menu>("api/menu",menu);
  }

  deleteMenu( menuId:number):Observable<void>{
    return this.http.delete<void>("api/menu/"+menuId);
  }

  changeMenuActivity(restaurantId:number,menu:Menu):Observable<void>{
    return this.http.put<void>("/api/menu/"+restaurantId+"/activity",menu);
  }

  getActiveMenu(restaurantId:number):Observable<Menu>{
    return this.http.get<Menu>("/api/menu/restaurant/"+restaurantId+"/active");
  }

  deleteItemFromMenu(menuId,itemId):Observable<void>{
    return this.http.delete<void>('/api/menu/'+menuId,{params:new HttpParams().set('itemId',itemId.toString())})
  }

}
