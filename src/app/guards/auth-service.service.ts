import { Injectable } from '@angular/core';
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';
import {SessionService} from  '../session.service'
import { JsonPipe } from '@angular/common';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
@Injectable({
  providedIn: 'root'
})




export  class AuthServiceService {
  
  headers=new HttpHeaders();
  
  constructor(private http: HttpClient, private session:SessionService){
    this.headers = this.headers.append('Content-Type', 'application/json');
  }
  login(user: string,pws: string){
    return this.http.post<any>("/Seguridad/LoginInicio",
    {UserLogin:user,Password:pws},{headers:this.headers,withCredentials:true},
    )
  }
   public  IsAuth(){
     return  JSON.parse(this.session.getKey("isAuth"));
   }
   public  logOut(){
     this.session.setKey("isAuth","false");
   }
   public setAuth(value:string){
    this.session.setKey("isAuth",value);
   }
   
}
