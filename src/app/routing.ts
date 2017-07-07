import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent} from './components/vehiculos/vehiculos.component';
    import { CreateVehicleComponent } from './components/vehiculos/create/create.component';
    import { EditVehicleComponent } from './components/vehiculos/edit-vehicle/edit-vehicle.component';
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
  }
];
