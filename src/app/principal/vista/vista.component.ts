import { Component, Inject } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css'],
})

// ********** Compoentente tabla Angular Material ***********
export class VistaComponent {
  // ************ //
  listado: Users[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'correo',
    'editar',
    'eliminar',
  ];
  dataSource: any;
  clickedRows = new Set<Users>();

  // ************ //

  constructor(
    private userService: UserserviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  agregar() {
    let user: Users = {
      Id: '',
      Nombre: '',
      Apellido: '',
      Correo: '',
    };
    //this.addUser(user);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      let data:Users = result;
      this.addUser(data);
    });
  }

  editarUsuario(user: Users) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      user = result;
      this.editar(user);
    });
  }

  getAllUsers() {
    this.userService.getUsersAll().subscribe({
      next: (UserAll: Users[]) => {
        (this.listado = UserAll), (this.dataSource = this.listado);
        console.log(this.listado);
      },
      error: (e) => console.error(e),
      complete: () => console.info('La API devolvio todos los registros'),
    });
  }

  addUser(user: Users) {
    this.userService.postUser(user).subscribe({
      next: (usuario: Users) => {
        console.log(usuario);
        this.getAllUsers();
      },
      error: (e) => {
        if (e.status == 200) {
          console.log('Se agrego el registro');
          this.getAllUsers();
        } else {
          console.error(e);
        }
      },
      complete: () => console.info('Se agrego el registro'),
    });
  }

  editar(user: Users) {
    this.userService.editUser(user).subscribe({
      next: (usuario: Users) => {
        console.log(usuario);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Se edito el registro'),
    });
  }

  eliminar(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllUsers();
      },
      error: (e) => {
        if (e.status == 200) {
          console.log('Se elimino el registro');
          this.getAllUsers();
        } else {
          console.error(e);
        }
      },
      complete: () => console.info('Se elimino el registro'),
    });
  }
}
