import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from './drink';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor(private http:HttpClient) { }

  getItemsToMake():Observable<Drink[]>{
    return this.http.get<Drink[]>("/api/kitchen",{params:new HttpParams().set('category','drink')});
  }

  itemMade(drink):Observable<Drink[]>{
    return this.http.put<Drink[]>("/api/kitchen",drink);
  }
}
