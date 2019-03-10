import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../guards/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private auth: AuthServiceService,private router:Router) { }

  ngOnInit() {
  }
  logOut(){
    this.auth.logOut();
    this.router.navigate(['']);
  }
}
