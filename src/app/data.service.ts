import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
  
  postRestaurant(restaurant) {
    return this.http.post("/api/owner/restaurant",restaurant);
  }

  deleteRestaurant(restaurantId): Observable<void> {
    return this.http.delete<void>("/api/owner/restaurant/"+restaurantId);
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

  postEmployee(restaurantId, employee){
    return this.http.post("/api/owner/restaurant/"+restaurantId+"/employee", employee);
  }

  postTable(restaurantId, table){
    return this.http.post("/api/restaurant/"+restaurantId+"/table", table);
  }

  postSeat(tableId, seat) {
    return this.http.post("api/table/"+tableId+"/seat", seat);
  }

  sendEmail(email) {
    return this.http.post("api/send/invite", email);
  }

  deleteSeat(tableId,seatId):Observable<void>{
    return this.http.delete<void>("/api/table/"+tableId+"/seat/"+seatId);
  }

  deleteEmployee(restaurantId,employeeId):Observable<void>{
    return this.http.delete<void>("/api/owner/restaurant/"+restaurantId+"/employee/"+employeeId);
  }

  deleteTable(restaurantId,tableId):Observable<void>{
    return this.http.delete<void>("/api/restaurant/"+restaurantId+"/table/"+tableId);
  }
}
