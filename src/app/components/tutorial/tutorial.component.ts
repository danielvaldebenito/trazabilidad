import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { CreateVehicleComponent } from '../vehiculos/create/create.component'
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
  providers: [ CreateVehicleComponent ]
})
export class TutorialComponent implements OnInit {
  dependenceDescription = "Las dependencias son tus lugares de trabajo. Por ejemplo tu local de venta. Será necesario que ingreses una dependencia para poder crear lo demás. ¡Crea tu primera dependencia!";
  vehicleDescription = "Si posees vehículos, podrás ingresarlos para poder utilizarlos en pedidos y ventas. Estos serán considerados como bodegas. ¿Tienes vehículos? ¡Crea el primero!";
  userDescription = "Lo más importante, aparte de ti, necesitas usuarios que te ayuden a manejar el sistema. Podría ser otro administrador con tus mismas funciones, un administrador con facultades específicas para una dependencia, o un usuario de tipo 'VEHÍCULO'. ¡Crea tu primer usuario!"
  thankYouDescription = "Gracias. Si ingresaste tus primeros datos, estás listo para ocupar el sistema. Si no lo hiciste, no te preocupes: Podrás hacerlo más adelante."
  dependenceOK = false
  vehicleOK = false
  userOK = false
  updateDependences = false
  @Output() onfinish = new EventEmitter();
  constructor(
    private _userService: UserService,
    private _swal2: SweetAlertService,
    private _createVehicle: CreateVehicleComponent
  ) { }
  ngOnInit() {
    
  }

  okTutorial(number) {
    switch(number) {
      case 1: 
        this.dependenceOK = true;
        this.updateDependences = true;
        break;
      case 2: 
        this.vehicleOK = true; 
      break;
      
    }
  }
  finish() {
    this._userService.finishTutorial()
      .subscribe(res => {
        if(res.done) {
          this.onfinish.emit();
          this._swal2.success({
            title: '¡Gracias!',
            text: res.message
          })
          .then(ok => {
            
          }, no => {

          })
          .catch(error => {
            console.log(error)
          })
        }
      }, 
      error => { 
        console.log(error)}
      )
  }
}
