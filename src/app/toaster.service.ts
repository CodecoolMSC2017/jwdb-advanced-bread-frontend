import { Injectable } from '@angular/core';

declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }

  success(title:string,message?:string){
    toastr.success(title,message)
  }

  warning(title:string,message?:string){
    toastr.warning(title,message)
  }

  error(title:string,message?:string){
    toastr.error(title,message)
  }

  info(message:string){
    toastr.info(message)
  }
}
