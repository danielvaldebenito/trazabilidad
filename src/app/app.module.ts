// internal modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// external modules
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SweetAlertService } from 'ngx-sweetalert2'
import { DateTimePickerModule } from 'ng-pick-datetime';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SelectModule } from 'ng-select';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from 'ngx-date-picker';
import { ArchwizardModule } from 'ng2-archwizard';
// routes
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routing';
// services (providers)
import { DependencesService } from './services/dependences.service';
import { UserService } from './services/user.service';
import { UsersService } from './services/users.service';
import { VehicleService } from './services/vehicles.service';
import { OrderService } from './services/order.service';
import { PriceListService } from './services/price-list.service';
import { FoliosService } from './services/folios.service';
import { ClientsService } from './services/clients.service';
import { PagerService } from './services/pager.service';
import { SelectsService } from './services/selects.service';
import { GoogleMapService }  from './services/googlemap.service';
import { AddressService } from './services/addresses.service';
import { InternalProcessesService } from './services/internal-processes.service';
import { DistributorsService } from './services/distributors.service'
import { SaleService } from './services/sale.service'
import { ProductsService } from './services/products.service'
import { DevicesService } from './services/devices.service'
import { MovementsService } from './services/movements.service'
import { StockService } from './services/stock.service'
import { InventoryService } from './services/inventory.service'
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
import { PriceListNewComponent } from './components/price-list/price-list-new/price-list-new.component';
import { PriceListEditComponent } from './components/price-list/price-list-edit/price-list-edit.component';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersNewComponent } from './components/users/users-new/users-new.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { UsersDetailsComponent } from './components/users/users-details/users-details.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';
import { PagerComponent } from './components/pager/pager.component';
import { DependencesComponent } from './components/dependences/dependences.component';
import { DependencesNewComponent } from './components/dependences/dependences-new/dependences-new.component';
import { DependencesEditComponent } from './components/dependences/dependences-edit/dependences-edit.component';
import { DependencesListComponent } from './components/dependences/dependences-list/dependences-list.component';
  import { PriceListListComponent } from './components/price-list/price-list-list/price-list-list.component';
  import { PriceListDetailComponent } from './components/price-list/price-list-detail/price-list-detail.component';
import { DependencesDetailComponent } from './components/dependences/dependences-detail/dependences-detail.component';
import { FoliosComponent } from './components/folios/folios.component';
import { FoliosNewComponent } from './components/folios/folios-new/folios-new.component';
import { FoliosListComponent } from './components/folios/folios-list/folios-list.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsNewComponent } from './components/clients/clients-new/clients-new.component';
import { ClientsEditComponent } from './components/clients/clients-edit/clients-edit.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { ClientsDetailComponent } from './components/clients/clients-detail/clients-detail.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InternalProcessesComponent } from './components/internal-processes/internal-processes.component';
import { InternalProcessesNewComponent } from './components/internal-processes/internal-processes-new/internal-processes-new.component';
import { InternalProcessesEditComponent } from './components/internal-processes/internal-processes-edit/internal-processes-edit.component';
import { InternalProcessesListComponent } from './components/internal-processes/internal-processes-list/internal-processes-list.component';
import { InternalProcessesDetailComponent } from './components/internal-processes/internal-processes-detail/internal-processes-detail.component';
import { DistributorsComponent } from './components/distributors/distributors.component';
import { DistributorsNewComponent } from './components/distributors/distributors-new/distributors-new.component';
import { DistributorsEditComponent } from './components/distributors/distributors-edit/distributors-edit.component';
import { DistributorsListComponent } from './components/distributors/distributors-list/distributors-list.component';
import { DistributorsDetailComponent } from './components/distributors/distributors-detail/distributors-detail.component';
import { SalesComponent } from './components/sales/sales.component';
import { SaleDetailComponent } from './components/sales/sale-detail/sale-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductMovementsComponent } from './components/products/product-movements/product-movements.component';
import { ProductLastPositionComponent } from './components/products/product-last-position/product-last-position.component';
import { ProductQueryComponent } from './components/products/product-query/product-query.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DevicesListComponent } from './components/devices/devices-list/devices-list.component';
import { DevicesDetailComponent } from './components/devices/devices-detail/devices-detail.component';
import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { MovementsComponent } from './components/movements/movements.component';
import { MovementsListComponent } from './components/movements/movements-list/movements-list.component';
import { MovementsItemComponent } from './components/movements/movements-item/movements-item.component';
import { MovementsTypesComponent } from './components/movements/movements-types/movements-types.component';
import { DatepickerRangeComponent } from './components/utilities/datepicker-range/datepicker-range.component';
import { MovementsDetailsTruckloadComponent } from './components/movements/movements-details/movements-details-truckload/movements-details-truckload.component';
import { MovementsDetailsTruckunloadComponent } from './components/movements/movements-details/movements-details-truckunload/movements-details-truckunload.component';
import { MovementsDetailsSaleComponent } from './components/movements/movements-details/movements-details-sale/movements-details-sale.component';
import { MovementsDetailsTransferComponent } from './components/movements/movements-details/movements-details-transfer/movements-details-transfer.component';
import { MovementsDetailsStationComponent } from './components/movements/movements-details/movements-details-station/movements-details-station.component';
import { MovementsDetailsComponent } from './components/movements/movements-details/movements-details.component';
import { StockComponent } from './components/stock/stock.component';
import { StockDependencesComponent } from './components/stock/stock-dependences/stock-dependences.component';
import { StockWarehousesComponent } from './components/stock/stock-warehouses/stock-warehouses.component';
import { StockProductsComponent } from './components/stock/stock-products/stock-products.component';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { MovementDetailsMaintenanceComponent } from './components/movements/movements-details/movement-details-maintenance/movement-details-maintenance.component';
import { OrderMonitorComponent } from './components/order/order-monitor/order-monitor.component';
import { OrderMonitorListComponent } from './components/order/order-monitor/order-monitor-list/order-monitor-list.component';
import { OrderMonitorItemComponent } from './components/order/order-monitor/order-monitor-item/order-monitor-item.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
// entorno
import { environment } from '../environments/environment';
import { InventoryListItemComponent } from './components/inventory/inventory-list/inventory-list-item/inventory-list-item.component';
import { InventoryListItemDetailComponent } from './components/inventory/inventory-list/inventory-list-item/inventory-list-item-detail/inventory-list-item-detail.component';


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
    PriceListEditComponent,
    UsersComponent,
    UsersListComponent,
    UsersNewComponent,
    UsersEditComponent,
    UsersDetailsComponent,
    NewPassComponent,
    PagerComponent,
    DependencesComponent,
    DependencesNewComponent,
    DependencesEditComponent,
    DependencesListComponent,
    DependencesDetailComponent,
    FoliosComponent,
    FoliosNewComponent,
    FoliosListComponent,
    ClientsComponent,
    ClientsNewComponent,
    ClientsEditComponent,
    ClientsListComponent,
    ClientsDetailComponent,
    OrderListComponent,
    OrderDetailComponent,
    InventoryComponent,
    InternalProcessesComponent,
    InternalProcessesNewComponent,
    InternalProcessesEditComponent,
    InternalProcessesListComponent,
    InternalProcessesDetailComponent,
    DistributorsComponent,
    DistributorsNewComponent,
    DistributorsEditComponent,
    DistributorsListComponent,
    DistributorsDetailComponent,
    SalesComponent,
    SaleDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductMovementsComponent,
    ProductLastPositionComponent,
    ProductQueryComponent,
    DevicesComponent,
    DevicesListComponent,
    DevicesDetailComponent,
    OrderHistoryComponent,
    TutorialComponent,
    MovementsComponent,
    MovementsListComponent,
    MovementsItemComponent,
    MovementsTypesComponent,
    DatepickerRangeComponent,
    MovementsDetailsTruckloadComponent,
    MovementsDetailsTruckunloadComponent,
    MovementsDetailsSaleComponent,
    MovementsDetailsTransferComponent,
    MovementsDetailsStationComponent,
    MovementsDetailsComponent,
    StockComponent,
    StockDependencesComponent,
    StockWarehousesComponent,
    StockProductsComponent,
    LoadingComponent,
    MovementDetailsMaintenanceComponent,
    OrderMonitorComponent,
    OrderMonitorListComponent,
    OrderMonitorItemComponent,
    InventoryListComponent,
    InventoryListItemComponent,
    InventoryListItemDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AngularFontAwesomeModule,
    DateTimePickerModule,
    DatepickerModule,
    NgxChartsModule,
    SelectModule,
    Ng2CompleterModule,
    ArchwizardModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: environment.GOOGLE_MAPS_API_KEY }),
    RouterModule.forRoot(
      appRoutes, { enableTracing: true, useHash: true } 
    )
  ],
  providers: [
    DependencesService, 
    UserService,
    UsersService,
    SaleService,
    VehicleService,
    NewPassComponent,
    PriceListService,
    FoliosService,
    ClientsService,
    InternalProcessesService,
    DistributorsService,
    PagerService, 
    SelectsService, 
    OrderService, 
    GoogleMapService,
    AddressService,
    SweetAlertService,
    ProductsService,
    DevicesService,
    MovementsService,
    StockService,
    InventoryService
    //{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
