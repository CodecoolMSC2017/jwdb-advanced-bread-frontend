import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  
  getEmployees() {
    return this.http.get("/api/owner/employee");
  }

  getEmployeesByRestaurant(restaurantId) {
    return this.http.get("/api/owner/restaurant/"+restaurantId+"/employee");
  }

  getEmployee(restaurantId,userId){
    return this.http.get("/api/owner/restaurant/"+restaurantId+"/employee/"+userId);
  }

  getRestaurants(){
    return this.http.get("/api/owner/restaurant");
  }

  getProfile(){
    return this.http.get("/api/profile");
  }


  getItems(){
    return this.http.get("/api/owner/items");
  }

  getRestaurant(restaurantId){
    return this.http.get("/api/owner/restaurant/"+restaurantId);
  }

  getTables(restaurantId) {
    return this.http.get("/api/restaurant/"+restaurantId+"/table");
  }
}
