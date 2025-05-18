import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'app/shared/model/user';

export function gerForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl(''),
    isAdmin: new UntypedFormControl(false),
  });
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],

})
export class UserAddComponent implements OnInit {
  form: UntypedFormGroup | null = null;

  constructor(public dialogRef: MatDialogRef<AdminPanelComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: User
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.data?.username || ''],
      password: [''],
      isAdmin: [this.data?.isAdmin || false]
    });
  }

}
