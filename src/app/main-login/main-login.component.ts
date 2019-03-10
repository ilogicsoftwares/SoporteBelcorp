import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import {Router} from '@angular/router';
import { AuthServiceService } from '../guards/auth-service.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { LoaderComponent } from '../loader/loader.component';



@Component({
  selector: 'main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {
  usuario: string;
  clave: string;
  router:Router;
  userError:boolean=false;
  loaderActive:boolean=false;
  constructor( router: Router, private authService: AuthServiceService) { 
    this.router=router;
  }

  ngOnInit() {
  }

  login(){
  this.loaderActive=true;
   let request=this.authService.login(this.usuario,this.clave);
   this.authService.login(this.usuario,this.clave).subscribe((data) =>{
    console.log(data.headers);
    if (data.Success){
      this.authService.setAuth("true");
      
      this.router.navigate(['/home']);
      
    }else{
      this.userError=true;
      
    }
    this.loaderActive=false;
    
   },(error) =>{
    console.log(error);
    this.usuario='';
    this.clave='';
   });
  }

}
