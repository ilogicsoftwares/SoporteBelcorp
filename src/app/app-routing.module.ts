import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {path: '', component: MainLoginComponent},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
