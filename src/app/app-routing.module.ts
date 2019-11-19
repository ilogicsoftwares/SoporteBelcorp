import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import {HomeContextComponent} from './home/home-context/home-context.component'
import { WelcomeComponent } from './welcome/welcome.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CuvsComponent } from './cuvs/cuvs.component';
import { OfertaPersonalizadaComponent } from './components/oferta-personalizada/oferta-personalizada.component';
import { ConsultaOpConsultoraComponent } from './components/consulta-op-consultora/consulta-op-consultora.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch:'full'},
  {path: 'login', component: MainLoginComponent},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuardService],children:[
   {
     path:"",
     component:WelcomeComponent,
     canActivate:[AuthGuardService],
     outlet:'secondary'
   },
   {
     path:"pedido",
     component:PedidosComponent,
     canActivate:[AuthGuardService],
     outlet:'secondary'
   },
   {
    path:"ofertaPersonalizada",
    component:OfertaPersonalizadaComponent,
    canActivate:[AuthGuardService],
    outlet:'secondary'
  },
  {
    path:"ofertaPersonalizadaConsultora",
    component:ConsultaOpConsultoraComponent,
    canActivate:[AuthGuardService],
    outlet:'secondary'
  },
   {
     path:"cuvs",
     component:CuvsComponent,
     canActivate:[AuthGuardService],
     outlet:'secondary'
   }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
