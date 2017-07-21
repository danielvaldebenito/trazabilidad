import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent} from './components/vehiculos/vehiculos.component';
    import { CreateVehicleComponent } from './components/vehiculos/create/create.component';
    import { EditVehicleComponent } from './components/vehiculos/edit-vehicle/edit-vehicle.component';
import { OrderComponent } from './components/order/order.component'
    import { OrderCreateComponent } from './components/order/order-create/order-create.component'
import { PriceListComponent } from './components/price-list/price-list.component'
    import { PriceListListComponent } from './components/price-list/price-list-list/price-list-list.component'
    import { PriceListDetailComponent } from './components/price-list/price-list-detail/price-list-detail.component'
    import { PriceListNewComponent } from './components/price-list/price-list-new/price-list-new.component'
    import { PriceListEditComponent } from './components/price-list/price-list-edit/price-list-edit.component'
import { AppComponent} from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
export const appRoutes: Routes = [
  {
    path: 'vehicles',
    component: VehiculosComponent
  },
  { 
    path: 'vehicles/create',
    component: CreateVehicleComponent
  },
  { 
    path: 'vehicles/edit/:id',
    component: EditVehicleComponent
  },
  { 
    path: 'order',
    component: OrderComponent
  },
  { 
    path: 'order/create',
    component: OrderCreateComponent
  },
  {
    path: 'price-list',
    component: PriceListComponent
  },
  {
    path: 'price-list/new',
    component: PriceListNewComponent
  },
  {
    path: 'price-list/edit/:id',
    component: PriceListEditComponent
  }

];
