import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthServiceService } from './guards/auth-service.service';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { HomeContextComponent } from './home/home-context/home-context.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CuvsComponent } from './cuvs/cuvs.component';
import { NavcontextComponent } from './navcontext/navcontext.component';
import { FormTinybaseComponent } from './forms/form-tinybase/form-tinybase.component';
import { InputComponent } from './forms/input/input.component';
import {AgGridModule} from 'ag-grid-angular';
import { TableComponent } from './forms/table/table.component';
import { OfertaPersonalizadaComponent } from './components/oferta-personalizada/oferta-personalizada.component';
import { ConsultaOpConsultoraComponent } from './components/consulta-op-consultora/consulta-op-consultora.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLoginComponent,
    HomeComponent,
    LoaderComponent,
    HomeContextComponent,
    SidemenuComponent,
    WelcomeComponent,
    PedidosComponent,
    CuvsComponent,
    NavcontextComponent,
    FormTinybaseComponent,
    InputComponent,
    TableComponent,
    OfertaPersonalizadaComponent,
    ConsultaOpConsultoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents(null)
  ],
  providers: [AuthGuardService,AuthServiceService,LoaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
