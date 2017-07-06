// internal modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// external modules
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
// routes
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routing';
// services
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicles.service';
import { PagerService } from './services/pager.service';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    VehiculosComponent,
    NotfoundComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ UserService, VehicleService, PagerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
