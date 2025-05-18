import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TrackAdminPanelComponent } from './components/track-admin-panel/track-admin-panel.component';

const routes: Routes = [
  { path: 'home/playlists', component: PlaylistsComponent },
  { path: 'home/albums', component: AlbumsComponent },
  { path: 'home/addplaylist', component: AddPlaylistComponent },
  { path: 'home/addalbum', component: AddAlbumComponent },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home/trackSearch', component: TrackSearchComponent },
  { path: 'home/trackAdminPanel', component: TrackAdminPanelComponent },
  { path: 'home/adminPanel', component: AdminPanelComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
