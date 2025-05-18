import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/utils/admin.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { User } from 'app/shared/model/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: any;
  columndefs: any[] = ['username', 'isAdmin', 'delete', 'edit'];
  constructor(private dialog: MatDialog, private service: AdminService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users = this.service.getUsers()
  }
  deleteUser(username: string) {
    this.service.deleteUser(username).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.getUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    )
  }

  updateUser(user: User) {

  const dialogRef = this.dialog.open(UserAddComponent, {
    data: user 
  });

  dialogRef.afterClosed().subscribe((updatedUser: User) => {
    if (updatedUser && updatedUser.username != null) {
      this.service.updateUser(user._id, updatedUser).subscribe(
        (response) => {
          console.log('User updated:', response);
          this.getUsers();
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    }
  });
}

  openDialog(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {});
    dialogRef.afterClosed().subscribe((user?: User) => {
      if (user != undefined && user.username != null) {
        this.service.createUser(user.username, user.password, user.isAdmin).subscribe(
          (response) => {
            console.log('User created successfully:', response);
            this.getUsers();
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      }
    })
  }
}
