import { Injectable } from '@angular/core';
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})




export  class AuthServiceService {
  isAuth:boolean=false; 
  headers=new HttpHeaders();
  
  constructor(private http: HttpClient){
    this.headers = this.headers.append('Content-Type', 'application/json');
  }
  login(user: string,pws: string){
    return this.http.post<any>("/Seguridad/LoginInicio",
    {UserLogin:user,Password:pws},{headers:this.headers,withCredentials:true},
    )
  }
   public static IsAuth(){
     return this.IsAuth;
   }
}
