import { Injectable } from '@angular/core';
import {HttpClient, HttpXsrfTokenExtractor} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export  class AuthServiceService {
  constructor(private http: HttpClient){}
  login(user: string,pws: string){
    return this.http.post<any>("http://soporte.somosbelcorp.com/Seguridad/LoginInicio",
    {UserLogin:"sdigitalpalancas",Password:"Belcorp2018#"}
    )
  }

}
