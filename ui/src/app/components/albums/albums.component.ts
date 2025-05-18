import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlbumService } from 'app/services/albums/album.service';
import { Album } from 'app/shared/model/album';
import { AddAlbumComponent } from '../add-album/add-album.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];

  constructor(
    private dialog: MatDialog,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => this.albums = data,
      error: (err) => console.error('Error fetching albums:', err)
    });
  }

 openEditAlbumDialog(album: Album): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, {
      data: album
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedAlbum: Album = {
          name: result.name,
          releaseDate: result.releaseDate,
          artistName: result.artistName,
          length: result.length,
          genre: result.genre,
          imageUrl: result.imageUrl
        };

        this.albumService.updateAlbum(album._id!, updatedAlbum).subscribe({
          next: () => this.fetchAlbums(),
          error: (err) => console.error('Hiba az album frissítésekor:', err)
        });
      }
    });
  }

  deleteAlbum(albumId: string): void {
    if (confirm('Biztosan törölni szeretnéd ezt az albumot?')) {
      this.albumService.deleteAlbum(albumId).subscribe({
        next: () => this.fetchAlbums(),
        error: (err) => console.error('Hiba az album törlésekor:', err)
      });
    }
  }


  openAddAlbumDialog(): void {
    const dialogRef = this.dialog.open(AddAlbumComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newAlbum: Album = {
          name: result.name,
          releaseDate: result.releaseDate,
          artistName: result.artistName,
          length: result.length,
          genre: result.genre,
          imageUrl: result.imageUrl
        };

        this.albumService.createAlbum(newAlbum).subscribe({
          next: (album) => {
            console.log('Album létrehozva:', album);
            this.fetchAlbums(); // frissítjük a listát
          },
          error: (err) => console.error('Hiba az album létrehozásakor:', err)
        });
      }
    });
  }
}