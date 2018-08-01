import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http:HttpClient) { }

  getTables(restaurantId){
    return this.http.get('/api/restaurant/'+restaurantId+'/table');
  }
}
