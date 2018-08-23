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
    return this.http.get<Item>('api/owner/restaurant/{restaurantId}/item/'+itemId)
  }
}
