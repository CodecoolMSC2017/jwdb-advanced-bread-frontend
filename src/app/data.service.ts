import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { Seat } from './seat';
import { Profile } from './profile';
import { Employee } from './employee';
import { Menu } from './menu';
import { Ingredient } from './ingredient';
import { Restaurant } from './restaurant';
import { Table } from './table';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  
  getEmployees() {
    return this.http.get("/api/owner/employee");
  }

  getEmployeesByRestaurant(restaurantId):Observable<Employee[]> {
    return this.http.get<Employee[]>("/api/owner/restaurant/"+restaurantId+"/employee");
  }

  getEmployee(restaurantId,userId):Observable<Employee>{
    return this.http.get<Employee>("/api/owner/restaurant/"+restaurantId+"/employee/"+userId);
  }

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

  getProfile():Observable<Profile>{
    return this.http.get<Profile>("/api/profile");
  }

  getTables(restaurantId):Observable<Table[]> {
    return this.http.get<Table[]>("/api/restaurant/"+restaurantId+"/table");
  }

  getTable(restaurantId,tableId):Observable<Table>{
    return this.http.get<Table>("/api/restaurant/"+restaurantId+"/table/"+tableId);
  }

  getSeats(tableId):Observable<Seat[]>{
    return this.http.get<Seat[]>("api/table/"+tableId+"/seat");
  }

  getOrders(restaurantId):Observable<any[]>{
    return this.http.get<any[]>("/api/order/restaurant/"+restaurantId);
  }

  getItems(){
    return this.http.get("/api/owner/items");
  }

  postEmployee(restaurantId, employee):Observable<Employee>{
    return this.http.post<Employee>("/api/owner/restaurant/"+restaurantId+"/employee", employee);
  }
  
  postTable(restaurantId, table):Observable<Table>{
    return this.http.post<Table>("/api/restaurant/"+restaurantId+"/table", table);
  }

  postSeats(tableId, seat, numOfSeats:number):Observable<Seat[]> {
    return this.http.post<Seat[]>("api/table/"+tableId+"/seat", {'value':numOfSeats});
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
  
  getRegistered(employeeId, restaurantId):Observable<Employee> {
    const params = new URLSearchParams();
    params.append('employeeId',employeeId);
    params.append('restaurantId',restaurantId);
    return this.http.get<Employee>('api/register?employeeId=' + employeeId + '&restaurantId='+ restaurantId);
  }

  postUser(employeeId,user): Observable<Employee>{
    return this.http.put<Employee>('/api/register/' + employeeId, user);
  }

  getMenus(restaurantId):Observable<Menu[]>{
    return this.http.get<Menu[]>("api/menu/restaurant/"+restaurantId);
  }

  getMenu(menuId):Observable<Menu> {
    return this.http.get<Menu>("api/menu/"+menuId);
  }

  postMenu(menu):Observable<Menu>{
    return this.http.post<Menu>("api/menu",menu);
  }

  deleteMenu( menuId):Observable<void>{
    return this.http.delete<void>("api/menu/"+menuId);
  }

  getItemsByMenu( menuId):Observable<Item[]>{
    return this.http.get<Item[]>("api/menu/"+menuId+"/items");
  }

  getIngredientsByItemId(itemId, restaurantId):Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>("api/owner/restaurant/"+restaurantId+"ingredient"+"/item/"+itemId);
  }

  changeMenuActivity(restaurantId,menu):Observable<void>{
    return this.http.put<void>("/api/menu/"+restaurantId+"/activity",menu);
  }

  getActiveMenu(restaurantId):Observable<Menu>{
    return this.http.get<Menu>("/api/menu/restaurant/"+restaurantId+"/active");
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

  addNewItemToMenu(menuId:number,item:Item):Observable<Menu>{
    return this.http.put<Menu>('api/'+menuId+'item',item)
  }
}
