import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private http: HttpClient) {}

  getItemsToMake():Observable<Food[]>{
    return this.http.get<Food[]>("/api/kitchen",{params:new HttpParams().set('category','food')});
  }

  itemMade(food):Observable<Food[]>{
    return this.http.put<Food[]>("/api/kitchen",food);
  }
}
