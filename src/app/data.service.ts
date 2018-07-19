import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  
  getEmployees() {
    return this.http.get("/api/owner/1/restaurant/1/employee");
  }

  getRestaurants(ownerId){
    return this.http.get("/api/owner/"+ownerId+"/restaurant");
  }

  getOwner(userId){
    return this.http.get("/api/owner/"+userId);
  }
}
