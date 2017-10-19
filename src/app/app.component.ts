import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NotificationComponent, NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { GLOBAL } from './global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  identity: any;
  token: string;
  userToReset: any = {}
  apiUrl: any = GLOBAL.apiUrl
  loading: boolean = true;

  public confirmOptions = {
    confirmText: 'Sí',
    declineText: 'No'
  }
  public notificationsOptions = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true
  }
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _notificationService: NotificationsService,
    private _modalService: NgbModal
  )
  {  
    _router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })


   }


  navigationInterceptor(event: RouterEvent) :void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.identity = this._userService.getUserIdentity();
    this.token = this._userService.getToken();
    if(this.identity && this.token) {
      this._userService.validateToken(this.token)
          .subscribe(
            res => { console.log('validation ok', res) },
            err => { 
              if(err.status == 404)
                this.logout();
            }
          )
        
    }
  }
  logout() {
    this._userService.clear();
    this._router.navigate(['']);
    this.refresh();
    window.location.reload()
  }
  resetPass: boolean = false;
  
  onLoginResetPass (event) {
    this.resetPass = true;
    this.userToReset = event
    console.log('userToReset', this.userToReset)
  }
  
  onResetPass(){
    this.resetPass = false;
    this.logout()
  }
  open(content) {
    this._modalService.open(content, { size: 'lg' })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }
  isSuperAdmin () {
    const identity = this._userService.getUserIdentity()
    return identity.isAdmin && identity.distributor.intern 
  }
  isIntern () {
    const identity = this._userService.getUserIdentity()
    return identity.distributor.intern 
  }
  isAdminFromDependence() {
    const identity = this._userService.getUserIdentity()
    return identity.dependence && identity.roles.indexOf('ADMIN') > -1
  }
  isAdminFromAnyDependence() {
    const identity = this._userService.getUserIdentity()
    return !identity.dependence && identity.roles.indexOf('ADMIN') > -1
  }
}
