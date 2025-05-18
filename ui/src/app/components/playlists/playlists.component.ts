import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'app/services/playlist/playlist.service';
import { AddPlaylistComponent } from '../add-playlist/add-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { Playlist } from 'app/shared/model/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: any[] = [];
  showModal = false;

  constructor(
      private dialog: MatDialog,
      private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  fetchPlaylists(): void {
    this.playlistService.getPlaylists().subscribe({
      next: (data) => this.playlists = data,
      error: (error) => console.error('Error fetching playlists:', error)
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddPlaylistComponent, {});
    dialogRef.afterClosed().subscribe((playlist: Playlist) => {
      if (playlist && playlist.name != null) {
      this.playlistService.createPlaylist(playlist).subscribe(() => {
        this.fetchPlaylists();
      });
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
  }
}
