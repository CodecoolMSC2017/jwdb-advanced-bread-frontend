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

  getRestaurant(restaurantId){
    return this.http.get("/api/owner/restaurant/"+restaurantId);
  }
  
  postRestaurant(restaurant){
    return this.http.post("/api/owner/restaurant",restaurant);
  }

  getProfile(){
    return this.http.get("/api/profile");
  }

  getTables(restaurantId) {
    return this.http.get("/api/restaurant/"+restaurantId+"/table");
  }

  getTable(restaurantId,tableId){
    return this.http.get("/api/restaurant/"+restaurantId+"/table/"+tableId);
  }

  getSeats(tableId){
    return this.http.get("api/table/"+tableId+"/seat");
  }

  getOrders(restaurantId){
    return this.http.get("/api/order/restaurant/"+restaurantId);
  }

  getItems(){
    return this.http.get("/api/owner/items");
  }


}