import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(environment.serverURl + 'api/user/login', {username: username, password:password},{responseType: 'text'});
  }

  logout(){
    return this.http.post(environment.serverURl+ 'api/user/logout', {}, {withCredentials: true, responseType:'text'})
  }
}
