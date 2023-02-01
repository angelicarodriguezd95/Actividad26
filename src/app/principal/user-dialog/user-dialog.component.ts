import { Component, Inject } from '@angular/core';
import { Users } from '../../models/users';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  isAddMode!: boolean;
  user: Users = {
    Id: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
  };
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {}
  ngOnInit(): void {
    if (this.data.Id == '') {
      this.isAddMode = true;
      console.log('Add Mode');
    } else {
      this.isAddMode = false;
      this.user = this.data;
      console.log('Edit Mode');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
