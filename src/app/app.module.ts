// internal modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// external modules
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SelectModule } from 'ng-select';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from "ng2-completer";
// routes
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routing';
// services (providers)
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicles.service';
import { OrderService } from './services/order.service';
import { PagerService } from './services/pager.service';
import { SelectsService } from './services/selects.service';
import { GoogleMapService }  from './services/googlemap.service';
import { AddressService } from './services/addresses.service';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateVehicleComponent } from './components/vehiculos/create/create.component';
import { EditVehicleComponent } from './components/vehiculos/edit-vehicle/edit-vehicle.component';
import { OrderComponent } from './components/order/order.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';

// entorno
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    VehiculosComponent,
    NotfoundComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    OrderComponent,
    OrderCreateComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    JasperoConfirmationsModule,
    AngularFontAwesomeModule,
    DateTimePickerModule,
    NgxChartsModule,
    SelectModule,
    Ng2CompleterModule,
    AgmCoreModule.forRoot({ apiKey: environment.GOOGLE_MAPS_API_KEY }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    )
  ],
  providers: [ 
    UserService, 
    VehicleService, 
    PagerService, 
    SelectsService, 
    OrderService, 
    GoogleMapService,
    AddressService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
