import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Album } from 'app/shared/model/album';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  form: UntypedFormGroup | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Album
  ) { }

  ngOnInit(): void {
    this.form = this.getAlbumForm();
  }

  getAlbumForm(): UntypedFormGroup {
    return new UntypedFormGroup({
      name: new UntypedFormControl(this.data?.name || '', Validators.required),
      releaseDate: new UntypedFormControl(this.data?.releaseDate || '', Validators.required),
      artistName: new UntypedFormControl(this.data?.artistName || '', Validators.required),
      length: new UntypedFormControl(this.data?.length || '', [Validators.required, Validators.min(1)]),
      genre: new UntypedFormControl(this.data?.genre || '', Validators.required),
      imageUrl: new UntypedFormControl(this.data?.imageUrl || '', Validators.required),
    });
  }
}
