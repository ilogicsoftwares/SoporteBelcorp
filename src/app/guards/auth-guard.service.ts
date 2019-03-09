//import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (AuthServiceService.IsAuth()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
