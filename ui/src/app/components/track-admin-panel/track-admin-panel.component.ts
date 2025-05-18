import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/utils/admin.service';
import { TrackAddComponent } from '../track-add/track-add.component';
import { Track } from 'app/shared/model/track';
import { TrackService } from 'app/utils/track.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-track-admin-panel',
  templateUrl: './track-admin-panel.component.html',
  styleUrls: ['./track-admin-panel.component.css']
})
export class TrackAdminPanelComponent implements OnInit {
  tracks:any;
  constructor(private dialog:MatDialog,private adminService:AdminService,private trackService:TrackService) { }

  ngOnInit(): void {
    this.getTracks()
  }

  openDialog():void{
    const dialogRef=this.dialog.open(TrackAddComponent,{});
    dialogRef.afterClosed().subscribe((track:Track)=>{
      if(track.title!=null){
        this.adminService.createTrack(track.title,track.artist,track.image_url,track.video_url).subscribe(
          (d: any) => {
            console.log('Track created successfully:', d);
            this.getTracks();
          },
          (error: any) => {
            console.error('Error creating track:', error);
          }
        );
      }
    })
  }
  
  

  getTracks() {
    this.trackService.getTracks().subscribe((d: any) => this.tracks = d);
    console.log(this.tracks)
  }
  
}
