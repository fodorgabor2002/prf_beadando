import {HttpClient} from '@angular/common/http';
import { environment } from 'app/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private hhtp:HttpClient) { }

  greet(){
    return this.http.get(environment.serverURl,{responseType:'text', withCredentials:true});
  }
}
