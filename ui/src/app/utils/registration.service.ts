import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string){
    const user={
      username:username,
      password:password,
      isAdminAcces:false,
    };
    return this.http.post(environment.serverURl+'api/user/register',user,{responseType: 'text'});

  //return this.http.post('http://localhost:3080/', user).subscribe((response: any) => {
  //console.log('Response:', response);
//});
  }
}
