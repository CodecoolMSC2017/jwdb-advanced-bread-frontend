import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http:HttpClient) { }

  getTables(){
    return this.http.get('/api/waiter/table');
  }

  assign(table):Observable<void>{
    return this.http.put<void>("/api/waiter/table/assign",table);
  }

  deassign(table):Observable<void>{
    return this.http.put<void>("api/waiter/table/unassign",table);
  }
}
