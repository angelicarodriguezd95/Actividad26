import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserApi } from '../models/userApi';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(currentUser: UserApi) {
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.changeLoginStatusSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    localStorage.removeItem('currentUser');
    this.changeLoginStatusSubject.next(false);
  }

  getUser(){
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }


}
