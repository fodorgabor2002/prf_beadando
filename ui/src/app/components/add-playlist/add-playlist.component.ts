import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})


export class AddPlaylistComponent implements OnInit {
  form: UntypedFormGroup | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddPlaylistComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.getPlaylistForm();
  }

 getPlaylistForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    cover_url: new UntypedFormControl('', Validators.required)
  });
}
}
