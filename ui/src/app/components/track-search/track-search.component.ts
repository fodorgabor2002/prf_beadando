import { Component, OnInit } from '@angular/core';
import { Track } from "../../shared/model/track";
import { TrackService } from 'app/utils/track.service';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {
  tracks: any;
  detailData: any;
  page = '';
  favorites = [];
  constructor(private service: TrackService) { }

  ngOnInit(): void {
    this.getTracks()
  }
  onFavorite(event: Track) {

  }

  getTracks() {
    this.service.getTracks().subscribe((d: any) => this.tracks = d);
    console.log(this.tracks)
  }

}
