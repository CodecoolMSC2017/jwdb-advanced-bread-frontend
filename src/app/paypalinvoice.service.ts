import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { PaypalItem } from './paypal-item';

@Injectable({
  providedIn: 'root'
})
export class PaypalinvoiceService {

  constructor(private http:HttpClient) { }

  createInvoice(paypalItems:PaypalItem[],access_token:string){
  let header = new HttpHeaders();
  header = header.append('Content-Type','application/json');
  header = header.append('Authorization',"Bearer "+access_token)
  return this.http.post("https://api.sandbox.paypal.com/v1/invoicing/invoices",

  {
    "merchant_info": {
      "email": "payment.bread-facilitator@gmail.com",
      "first_name": "Herczeg",
      "last_name": "Kenéz",
      "business_name": "Bread.llc",
      "phone": {
        "country_code": "+36",
        "national_number": "702342664"
      }
    },
    "items": paypalItems,
    "note": "Thank you for your business.",
    "terms": "No refunds after 30 days.",
    "allow_tip":true
  },{ headers:header})
}

getQr(invoiceId:string,access_token:string):Observable<any>{
  let header = new HttpHeaders();
  header = header.append('Content-Type','application/json')
  header = header.append('Authorization',"Bearer "+access_token)
  return this.http.get<any>('https://api.sandbox.paypal.com/v1/invoicing/invoices/'+invoiceId+'/qr-code',{headers:header})
}


senInvoice(invoiceId:string,access_token:string):Observable<void>{
  let header = new HttpHeaders();
  header = header.append('Content-Type','application/json')
  header = header.append('Authorization',"Bearer "+access_token)
  return this.http.post<void>('https://api.sandbox.paypal.com/v1/invoicing/invoices/'+invoiceId+'/send',{params : new HttpParams().set('notify_customer','false')},{headers:header})
}

getAccessToken():Observable<any>{
  let header = new HttpHeaders(
    
  )
  header = header.append('Authorization', 'Basic '+ btoa(environment.CLIENT_ID+':'+environment.SECTRET_KEY));
  header = header.append("Content-Type", "application/x-www-form-urlencoded");
  header = header.append('Accept','application/json')
  header = header.append('Accept-Language','en_US')
  return this.http.post<any>('https://api.sandbox.paypal.com/v1/oauth2/token','grant_type=client_credentials',{headers:header})
}


}
