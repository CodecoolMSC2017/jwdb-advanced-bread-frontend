import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item';
import { Table } from './table';


@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http:HttpClient) { }

  getTables():Observable<Table[]>{
    return this.http.get<Table[]>('/api/waiter/table');
  }

  getOrdersByTable(tableId):Observable<any[]>{
    return this.http.get<any[]>("/api/order/table/"+tableId);
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

  getOrdersBySeat(seatId):Observable<any[]>{
    return this.http.get<any[]>("/api/order/seat/"+seatId+"/active");  
  }

  deleteOrder(seatId,orderItemId:string):Observable<void>{
    return this.http.delete<void>("/api/order/seat/"+seatId,{params: new HttpParams().set('orderItemId',orderItemId)})
  }

  splitInvoice(seatIds:Array<number>){
    let paramList = new HttpParams()
    for(let i = 0; i < seatIds.length ; i++){
      paramList = paramList.append('seatId',seatIds[i].toString())
    }
    return this.http.get("/api/order/invoice",{params:paramList})
  }
}
