import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UserApi } from '../../models/userApi';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  user: UserApi = {
    id: 0,
    name: '',
    username: '',
    email: '',
  };
  constructor(private autenticacion: AutenticacionService,) {};
  ngOnInit() {
    this.user = this.autenticacion.getUser();
  }
}
