import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AlbumsComponent } from './components/albums/albums.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TrackAdminPanelComponent } from './components/track-admin-panel/track-admin-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrackAddComponent } from './components/track-add/track-add.component';
import { TrackComponent } from './components/track/track.component';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,

  // Angular Material modulok
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    PlaylistsComponent,
    AddPlaylistComponent,
    AddAlbumComponent,
    UserAddComponent,
    AdminPanelComponent,
    TrackAdminPanelComponent,
    HomeComponent,
    TrackAddComponent,
    RegistrationComponent,
    TrackComponent,
    TrackSearchComponent,
    LoginComponent,
    NavbarComponent,
    UserAddComponent
  ],
  imports: [...modules
  ],
  exports: [...modules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
