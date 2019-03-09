import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import {Router} from '@angular/router';
import { AuthServiceService } from '../guards/auth-service.service';



@Component({
  selector: 'main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {
  usuario: string;
  clave: string;
  router:Router;
  constructor( router: Router, private authService: AuthServiceService) { 
    this.router=router;
  }

  ngOnInit() {
  }

  login(){
   this.authService.login(this.usuario,this.clave).subscribe(data =>{
    console.log(data);
   },(error) =>{
    console.log(error);
    this.usuario='';
    this.clave='';
   });
  }

}
