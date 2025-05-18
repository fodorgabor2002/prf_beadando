import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Album } from 'app/shared/model/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = environment.serverURl + 'api/album';

  constructor(private http: HttpClient) { }

  // Új album létrehozása
  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  // Összes album lekérése
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  // Egy album lekérése ID alapján
  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  // Album frissítése
  updateAlbum(id: string, album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiUrl}/${id}`, album);
  }

  // Album törlése
  deleteAlbum(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
