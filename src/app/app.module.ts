// internal modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// routes
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routing';
// services (providers)
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicles.service';
import { OrderService } from './services/order.service';
import { PriceListService } from './services/price-list.service';
import { PagerService } from './services/pager.service';
import { SelectsService } from './services/selects.service';
import { GoogleMapService }  from './services/googlemap.service';
import { AddressService } from './services/addresses.service';
import { SweetAlertService } from 'ng-sweetalert2-slc';
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
import { PriceListComponent } from './components/price-list/price-list.component';
  import { PriceListListComponent } from './components/price-list/price-list-list/price-list-list.component';
  import { PriceListDetailComponent } from './components/price-list/price-list-detail/price-list-detail.component';

// entorno
import { environment } from '../environments/environment';
import { PriceListNewComponent } from './components/price-list/price-list-new/price-list-new.component';
import { PriceListEditComponent } from './components/price-list/price-list-edit/price-list-edit.component';


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
    OrderCreateComponent,
    PriceListComponent,
    PriceListListComponent,
    PriceListDetailComponent,
    PriceListNewComponent,
    PriceListEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: environment.GOOGLE_MAPS_API_KEY }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    )
  ],
  providers: [ 
    UserService, 
    VehicleService,
    PriceListService,
    PagerService, 
    SelectsService, 
    OrderService, 
    GoogleMapService,
    AddressService,
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
