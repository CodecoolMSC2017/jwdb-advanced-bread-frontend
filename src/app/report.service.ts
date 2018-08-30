import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderItem } from './order-item';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getAllRestaurntIncomeAvg(startDate:string,endDate:string):Observable<any[]>{
    let paramsList = new HttpParams();
    paramsList = paramsList.append('start',startDate);
    paramsList = paramsList.append('end',endDate)
    return this.http.get<any[]>("/api/stats/owner/restaurants/avg/income",{params:paramsList})
  }

  getAllRestaurntIncomeSum(ownerId:number,startDate:string,endDate:string):Observable<any[]>{
    let paramsList = new HttpParams();
    paramsList = paramsList.append('start',startDate);
    paramsList = paramsList.append('end',endDate)
    return this.http.get<any[]>("/api/stats/owner/restaurants/sum/income",{params:paramsList})
  }

  getOrdersQuantity(restaurantId:number,startDate:string,endDate:string):Observable<any[]>{
    let paramsList = new HttpParams();
    paramsList = paramsList.append('start',startDate);
    paramsList = paramsList.append('end',endDate)
    return this.http.get<any[]>("/api/stats/order/orderitemquantity/"+restaurantId,{params:paramsList})
  }
}
