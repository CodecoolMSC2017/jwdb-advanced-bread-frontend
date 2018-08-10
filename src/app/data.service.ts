import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { Seat } from './seat';
import { Profile } from './profile';



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

  getRestaurant(restaurantId):Observable<any>{
    return this.http.get("/api/owner/restaurant/"+restaurantId);
  }
  
  postRestaurant(restaurant) {
    return this.http.post("/api/owner/restaurant",restaurant);
  }

  deleteRestaurant(restaurantId): Observable<void> {
    return this.http.delete<void>("/api/owner/restaurant/"+restaurantId);
  }

  getProfile():Observable<Profile>{
    return this.http.get<Profile>("/api/profile");
  }

  getTables(restaurantId) {
    return this.http.get("/api/restaurant/"+restaurantId+"/table");
  }

  getTable(restaurantId,tableId){
    return this.http.get("/api/restaurant/"+restaurantId+"/table/"+tableId);
  }

  getSeats(tableId):Observable<Seat[]>{
    return this.http.get<Seat[]>("api/table/"+tableId+"/seat");
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

  sendEmail(user) {
    return this.http.post("api/send", user);
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
  
  getRegistered(employeeId, restaurantId) {
    const params = new URLSearchParams();
    params.append('employeeId',employeeId);
    params.append('restaurantId',restaurantId);
    console.log('api/register?employeeId=' + employeeId + '&restaurantId='+ restaurantId);
    return this.http.get('api/register?employeeId=' + employeeId + '&restaurantId='+ restaurantId);
  }

  postUser(employeeId,user) {
    return this.http.put('/api/register/' + employeeId, user);
  }

  getMenus(restaurantId){
    return this.http.get("api/menu/restaurant/"+restaurantId);
  }

  getMenu(menuId) {
    return this.http.get("api/menu/"+menuId);
  }

  postMenu(menu){
    return this.http.post("api/menu",menu);
  }

  deleteMenu( menuId):Observable<void>{
    return this.http.delete<void>("api/menu/"+menuId);
  }

  getItemsByMenu( menuId){
    return this.http.get("api/menu/"+menuId+"/items");
  }

  getIngredientsByItemId(itemId, restaurantId) {
    return this.http.get("api/owner/restaurant/"+restaurantId+"ingredient"+"/item/"+itemId);
  }

  changeMenuActivity(restaurantId,menu):Observable<void>{
    return this.http.put<void>("/api/menu/"+restaurantId+"/activity",menu);
  }

  getActiveMenu(restaurantId){
    return this.http.get("/api/menu/restaurant/"+restaurantId+"/active");
  }

  getUser(userId, username) : Observable<any> {
    return this.http.get("api/changepw?userId="+ userId+"&username="+username);
  }

  changePassword(userId, passwordChange): Observable<any>{
    return this.http.put("api/changepw", passwordChange);
  }
  
  getAllItems(restaurantId):Observable<any> {
    return this.http.get("/api/owner/restaurant/"+restaurantId+"/item",{params:new HttpParams().set('category', "all")});
  }
}
