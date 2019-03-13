import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  dataBuild(data:any[]){

    let object={};
    data.map((a)=>{
     
      return object[a.inputid] = a.value;
    });
    return object;
  }
}
