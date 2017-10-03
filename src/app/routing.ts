import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent} from './components/vehiculos/vehiculos.component';
    import { CreateVehicleComponent } from './components/vehiculos/create/create.component';
    import { EditVehicleComponent } from './components/vehiculos/edit-vehicle/edit-vehicle.component';
import { OrderComponent } from './components/order/order.component'
    import { OrderCreateComponent } from './components/order/order-create/order-create.component'
import { PriceListComponent } from './components/price-list/price-list.component'
    import { PriceListNewComponent } from './components/price-list/price-list-new/price-list-new.component'
    import { PriceListEditComponent } from './components/price-list/price-list-edit/price-list-edit.component'
import { UsersComponent } from './components/users/users.component'
    import { UsersNewComponent } from './components/users/users-new/users-new.component'
    import { UsersEditComponent } from './components/users/users-edit/users-edit.component'
import { DependencesComponent } from './components/dependences/dependences.component'
    import { DependencesNewComponent } from './components/dependences/dependences-new/dependences-new.component'
    import { DependencesEditComponent } from './components/dependences/dependences-edit/dependences-edit.component'
import { FoliosComponent } from './components/folios/folios.component'
    import { FoliosNewComponent } from './components/folios/folios-new/folios-new.component'
import { ClientsComponent } from './components/clients/clients.component'
    import { ClientsNewComponent } from './components/clients/clients-new/clients-new.component'
    import { ClientsEditComponent } from './components/clients/clients-edit/clients-edit.component'
import { InventoryComponent } from './components/inventory/inventory.component'
import { InternalProcessesComponent } from './components/internal-processes/internal-processes.component'
    import { InternalProcessesNewComponent } from './components/internal-processes/internal-processes-new/internal-processes-new.component'
    import { InternalProcessesEditComponent } from './components/internal-processes/internal-processes-edit/internal-processes-edit.component'
import { DistributorsComponent } from './components/distributors/distributors.component'
    import { DistributorsNewComponent } from './components/distributors/distributors-new/distributors-new.component'
    import { DistributorsEditComponent } from './components/distributors/distributors-edit/distributors-edit.component'
export const appRoutes: Routes = [
  { path: 'vehicles', component: VehiculosComponent },
  { path: 'vehicles/create', component: CreateVehicleComponent },
  { path: 'vehicles/edit/:id', component: EditVehicleComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/create', component: OrderCreateComponent },
  { path: 'price-list', component: PriceListComponent },
  { path: 'price-list/new', component: PriceListNewComponent },
  { path: 'price-list/edit/:id', component: PriceListEditComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UsersNewComponent },
  { path: 'users/edit/:id', component: UsersEditComponent },
  { path: 'dependences', component: DependencesComponent },
  { path: 'dependences/new', component: DependencesNewComponent },
  { path: 'dependences/edit/:id', component: DependencesEditComponent },
  { path: 'folios', component: FoliosComponent },
  { path: 'folios/new', component: FoliosNewComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/new', component: ClientsNewComponent },
  { path: 'clients/edit/:id', component: ClientsEditComponent },
  { path: 'inventory', component: InventoryComponent},
  { path: 'internalprocess', component: InternalProcessesComponent },
  { path: 'internalprocess/new', component: InternalProcessesNewComponent },
  { path: 'internalprocess/edit/:id', component: InternalProcessesEditComponent },
  { path: 'distributors', component: DistributorsComponent },
  { path: 'distributors/new', component: DistributorsNewComponent },
  { path: 'distributors/edit', component: DistributorsEditComponent }

];
