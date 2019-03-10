import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  getKey (key:string){
  return sessionStorage.getItem(key);
  }
  setKey (key:string,value:string){
  return sessionStorage.setItem(key,value);
  }
  delete(key:string){
  return sessionStorage.removeItem(key);
  }
}
