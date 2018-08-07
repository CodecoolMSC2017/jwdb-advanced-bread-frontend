import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item';


@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http:HttpClient) { }

  getTables(){
    return this.http.get('/api/waiter/table');
  }

  getOrdersByTable(tableId){
    return this.http.get("/api/order/table/"+tableId);
  }

  assign(table):Observable<void>{
    return this.http.put<void>("/api/waiter/table/assign",table);
  }

  deassign(table):Observable<void>{
    return this.http.put<void>("api/waiter/table/unassign",table);
  }

  createInvoice(tableId){
    return this.http.get("/api/order/table/"+tableId+"/invoice");
  }

  pay( invoice):Observable<void>{
    return this.http.put<void>("/api/order/invoice/set-paid",invoice);
  }

  takeOrder(seatId,orderItem:OrderItem){
    return this.http.post("/api/order/seat/"+seatId,orderItem);
  }

  getOrdersBySeat(seatId){
    return this.http.get("/api/order/seat/"+seatId+"/active");  
  }

  deleteOrder(seatId,orderItemId:string):Observable<void>{
    return this.http.delete<void>("/api/order/seat/"+seatId,{params: new HttpParams().set('orderItemId',orderItemId)})
  }
}
