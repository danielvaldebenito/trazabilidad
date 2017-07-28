import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service'

@Injectable()
export class UsersService {
  headers: any;
  user: any;
  url: any = GLOBAL.apiUrl;
  constructor(
    private _userService: UserService,
    private _http: Http
  ) { 
    this.headers = new Headers({
        'Authorization': this._userService.getToken(),
        'Content-Type': 'application/json'
    })
    this.user = this._userService.getUserIdentity ();
  }

  getUsers (filter, limit, page) {
    
    var url = this.url + 'users/' + this.user.distributor;
    var params = { filter: filter, limit: limit, page: page }
    return this._http.get(url, { headers: this.headers, params: params })
            .map(res => res.json());
  }

  getUser (id: string) {
    var url = this.url + 'user/' + id;
    return this._http.get(url, { headers: this.headers })
            .map(res => res.json());
  }
  saveUser (user: any) {
    var url = this.url + 'register/';
    var body = user;
    body.distributor = this.user.distributor
    
    return this._http.post(url, body, { headers: this.headers })
                      .map(res => res.json())
  }
  
  updateUser (user: any, id: string) {
    var url = this.url + 'update-user/' + id;
    var body = user;
    return this._http.put(url, body, { headers: this.headers })
                      .map(res => res.json())
  }

  makeFileRequest (files: Array<File>, id: any) {
    var url = this.url + 'upload-image-user/' + id;
    return new Promise((resolve, reject) => {
      var formData: any = new FormData()
      var xhr = new XMLHttpRequest()

      for(var i = 0; i < files.length; i++){
        formData.append('image', files[i])
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
          if(xhr.status == 200)
            resolve(JSON.parse(xhr.response))
        } else {
          reject(xhr.response)
        }
      }
      
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', this._userService.getToken())
      xhr.send(formData);
    })
  }

  validateUser(username: string, id?: string) {
    var url = this.url + '/users/exists/' + username;
    var params = { id: id }
    return this._http.get(url, { headers: this.headers, params: params })
            .map(res => res.json());
  }

}
