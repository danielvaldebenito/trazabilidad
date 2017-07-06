import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent} from './components/vehiculos/vehiculos.component';
import { AppComponent} from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
export const appRoutes: Routes = [
  {
    path: 'vehicles',
    component: VehiculosComponent
  }
];
