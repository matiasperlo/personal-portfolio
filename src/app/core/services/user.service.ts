import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

/**
 * Servicio para manejar el estado del login de usuario y al usuario logueado
 */
@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {
    this.quitarLogin(); // inicializa el servicio como carente de usuario para poder ocmenzar
  }
  
  /**
   * Guarda los datos del User que se acaba de authenticar para el login
   * @param user 
   */
  setLogin(user: User){
    this.jwtService.guardarToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Borra los datos del login y del usuario logueado
   */
  quitarLogin(){
    this.jwtService.destruirToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Intenta loguear al usuario y obtener sus datos y los datos de la sesion
   * @param credentials campos obtenidos de los formularios para realizar el login
   * @returns Observable del http request POST
   */
  attemptAuth(credentials: any){
    const req_credentials = { username: credentials["username"], password: credentials["password"] };
    return this.apiService.post('/auth', req_credentials);
    // return this.apiService.post('/auth', req_credentials)
    // .pipe(map(data => {
    //   this.setLogin(data.user);
    //   return data;
    // }))
  }

  getCurrentUser(): User{
    return this.currentUserSubject.value;
  }

  update(user: User): Observable<User> {
    return this.apiService
    .put('/users/update', {user })
    .pipe(map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    }))
  }
}
