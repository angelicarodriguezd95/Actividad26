import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  userError = '';
  passError = '';
  constructor(
    private autenticacion: AutenticacionService,
    private router: Router,
    public userService: UserserviceService
  ) {}

  redireccion = '';

  login() {
    this.error = '';
    this.userError = '';
    this.passError = '';
    if (this.username == '') {
      this.userError = 'El usuario no puede estar vacío';
    }
    if (this.password == '') {
      this.passError = 'La contraseña no puede estar vacía';
    }
    if (this.username != '' && this.password != '') {
      this.userService.getUsersForLogin().subscribe((data) => {
        console.log(data);
        data.forEach((element) => {
          if (
            element.username == this.username &&
            element.email == this.password
          ) {
            console.log(element);
            this.autenticacion.login(element);
            this.router.navigate([this.redireccion]);
          } else {
            this.error = 'Usuario y/o contraseña incorrectos';
          }
        });
      });
    }
  }
}
