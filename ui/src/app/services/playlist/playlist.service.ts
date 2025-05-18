import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Playlist } from 'app/shared/model/playlist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl = environment.serverURl + 'api/playlist';

  constructor(private http: HttpClient) { }

  // Új playlist létrehozása
  createPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist);
  }

  // Összes playlist lekérdezése
  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  // Egy playlist lekérdezése ID alapján
  getPlaylistById(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${id}`);
  }

  // Playlist frissítése
  updatePlaylist(id: string, playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.patch<Playlist>(`${this.apiUrl}/${id}`, playlist);
  }

  // Playlist törlése
  deletePlaylist(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
