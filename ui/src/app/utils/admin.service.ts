import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(environment.serverURl + 'api/user/')
  }

  createUser(username: string, password: string, isAdmin: boolean) {
    const user = {
      username: username,
      password: password,
      isAdminAcces: isAdmin,
    };
    return this.http.post(environment.serverURl + 'api/user/register', user, { responseType: 'text' });
  }

  deleteUser(username: string) {
    console.log('deleting user : ' + username)
    return this.http.delete(environment.serverURl + `api/user/${username}/`, { responseType: 'text' });
  }

  updateUser(username: string, data: any) {
    return this.http.post(environment.serverURl + `api/user/${username}/`, data)
  }

  createTrack(title: string, artist: string, image_url: string, video_url: string) {
    const track = {
      title: title,
      artist: artist,
      image_url: image_url,
      video_url: video_url
      //image:image
    };
    return this.http.post(environment.serverURl + 'api/track', track, { responseType: 'text' });
  }

  deleteTrack(title: string) {
    const track = {
      title: title
    }
    console.log('deleting track : ' + title)
    return this.http.delete(environment.serverURl + `api/track/${track.title}/`, { responseType: 'text' });
  }
}
