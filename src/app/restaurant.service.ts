import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  getRestaurants():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>("/api/owner/restaurant");
  }

  getRestaurant(restaurantId):Observable<any>{
    return this.http.get("/api/owner/restaurant/"+restaurantId);
  }

  postRestaurant(restaurant):Observable<Restaurant> {
    return this.http.post<Restaurant>("/api/owner/restaurant",restaurant);
  }

  deleteRestaurant(restaurantId): Observable<void> {
    return this.http.delete<void>("/api/owner/restaurant/"+restaurantId);
  }
}
