import {Component, Inject, OnInit, EventEmitter,Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import { MatDialogRef } from '@angular/material/dialog';

export function gerForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    title: new UntypedFormControl('',Validators.required),
    artist: new UntypedFormControl('',Validators.required),
    image_url: new UntypedFormControl('',Validators.required),
    video_url: new UntypedFormControl('',Validators.required),
  });
}

@Component({
  selector: 'app-track-add',
  templateUrl: './track-add.component.html',
  styleUrls: ['./track-add.component.css'],

})
export class TrackAddComponent implements OnInit {
  form: UntypedFormGroup | null = null;


  constructor(public dialogRef:MatDialogRef<AdminPanelComponent>) { }

  ngOnInit(): void {
    this.form = gerForm();
  }

  

}
