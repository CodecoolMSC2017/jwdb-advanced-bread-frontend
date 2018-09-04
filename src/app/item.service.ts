import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  getItems(){
    return this.http.get("/api/owner/items");
  }

  getItemsByMenu( menuId):Observable<Item[]>{
    return this.http.get<Item[]>("api/menu/"+menuId+"/items");
  }

  getAllItems(restaurantId):Observable<any> {
    return this.http.get("/api/owner/restaurant/"+restaurantId+"/item",{params:new HttpParams().set('category', "all")});
  }

  getAddableItems(restaurantId:number,menuId:number):Observable<Item[]>{
    return this.http.get<Item[]>('api/owner/restaurant/'+restaurantId+'/item/'+menuId+'/noitems')
  }

  getById(itemId:number):Observable<Item>{
    return this.http.get<Item>('api/owner/restaurant/1/item/'+itemId)
  }

  postItem(newItem:Item,restaurantId:number):Observable<Item>{
    return this.http.post<Item>('/api/owner/restaurant/'+restaurantId+'/item',newItem)
  }

  deleteItem(restaurantId:number,itemId:number):Observable<void>{
    return this.http.delete<void>('/api/owner/restaurant/'+restaurantId+'/item/'+itemId)
  }
}
