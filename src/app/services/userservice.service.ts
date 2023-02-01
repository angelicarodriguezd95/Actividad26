import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';
import { UserApi } from '../models/userApi';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  // Crear una instancia de HttpClient
  constructor(private http: HttpClient) {}

  // Definir la URL (EndPoint) de la API (La BaseURL de la API estara en environment.ts)
  apiVista = environment.apiURL + 'vista/';
  apiEliminar = environment.apiURL + 'eliminar/';
  apiActualizar = environment.apiURL + 'actualizar/';
  apiAgregar = environment.apiURL + 'nuevo/';
  apiLogin = environment.apiUser;
  // Metodos GET para obtener datos de la API users

  getUsersAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiVista);
  }

  getUserId(userId: string): Observable<Users> {
    const url = this.apiVista + userId;
    return this.http.get<Users>(url);
  }

  // Metodo POSt para enviar datos a la API users

  postUser(usuario: Users): Observable<any> {
    return this.http.post<any>(this.apiAgregar, usuario);
  }

  editUser(usuario: Users): Observable<Users> {
    return this.http.put<Users>(this.apiVista, usuario);
  }

  deleteUser(userId: string): Observable<Users> {
    const url = this.apiEliminar + userId;
    const resp = this.http.delete<Users>(url);
    return resp;
  }

  getUsersForLogin(): Observable<UserApi[]> {
    return this.http.get<UserApi[]>(this.apiLogin);
  }

  // login(nombre: string, correo: string, users: UserApi[]): Observable<any> {
  //   let user: UserApi | object;
  //   users.forEach((element) => {
  //     if (element.username == nombre && element.email == correo) {
  //       user = element;
  //       //console.log(user);
  //     }
  //   });
  //   // retornar usuariosi existe
  // }

  // Metodo GET para el Interceptor
  getUsersAllInterceptor(): Observable<any> {
    return this.http.get(this.apiVista, { observe: 'response' });
  }
}
