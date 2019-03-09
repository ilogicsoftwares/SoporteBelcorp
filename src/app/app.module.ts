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

@NgModule({
  declarations: [
    AppComponent,
    MainLoginComponent,
    HomeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService,AuthServiceService,LoaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
