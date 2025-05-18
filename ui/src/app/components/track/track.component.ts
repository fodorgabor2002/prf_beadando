import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { Track } from 'app/shared/model/track';
import { AdminService } from 'app/utils/admin.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Input() adminMode:boolean;
  @Input() track: Track;
  @Input() hasAction=true;
  @Output() getTrack=new EventEmitter<Track>();
  @Output() callFav=new EventEmitter<Track | null>();
  
  constructor(private service:AdminService) {}

  ngOnInit(): void {
  }

  openVideo(){
    window.open(this.track.video_url)
  }

  deleteTrack(title:string){
    this.service.deleteTrack(title).subscribe(d=>{})
    window.location.reload();
  }

}
