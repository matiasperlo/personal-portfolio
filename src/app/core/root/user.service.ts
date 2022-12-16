import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { JwtService } from './jwt.service';

/**
 * Servicio Singleton para manejar el estado del login de usuario y al usuario logueado
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>();
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  private loginObserver = (data: any) => { 
    if (this.isUser(data)) {
      this.setLogin(data as User);
    }
  };

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {

    this.setup();
  }

  setup(){
    this.currentUserSubject.next(this.getCurrentUser());
    this.isAuthenticatedSubject.next(this.getIsAuthenticated());
  }
  
  isUser(data: unknown): boolean {
    return data instanceof Object && "username" in data && "jwt" in data;
  }

  getCurrentUser(): User{
    // return this.currentUserSubject.value;
    let currentUser = window.sessionStorage.getItem("user");
    return currentUser != null ? JSON.parse(currentUser) : {} as User;
  }

  private setUser(user: User){
    window.sessionStorage["user"] = JSON.stringify(user);
    this.currentUserSubject.next(user);
  }

  getRolOfCurrentUser(){
    return this.getCurrentUser().rol;
  }

  getIsAuthenticated(): boolean {
    let isAuth = window.sessionStorage.getItem("isAuthenticated");
    return isAuth != null ? isAuth.toLowerCase() === 'true' : false;
  }

  private setIsAuthenticated(isAuth: boolean){
    window.sessionStorage["isAuthenticated"] = isAuth;
    this.isAuthenticatedSubject.next(isAuth);
  }

  /**
   * Guarda los datos del User que se acaba de authenticar para el login
   * @param user 
   */
   setLogin(user: User){
    this.jwtService.guardarToken(user.jwt);
    this.setUser(user);
    this.setIsAuthenticated(true);
  }

  /**
   * Borra los datos del login y del usuario logueado
   */
  quitarLogin(){
    this.jwtService.destruirToken();
    this.setUser({} as User);
    this.setIsAuthenticated(false);
  }

  /**
   * Intenta loguear al usuario y obtener sus datos y los datos de la sesion
   * @param credentials campos obtenidos de los formularios para realizar el login
   * @returns Observable del http request POST
   */
  attemptAuth(credentials: any){
    const req_credentials = { username: credentials["username"], password: credentials["password"] };
    return this.apiService.post('/auth', req_credentials)
                .pipe(
                  tap( this.loginObserver )
    );
  }

  register(credentials: any){
    const req_credentials = { username: credentials["username"], password: credentials["password"] };
    return this.apiService.post('/signup', req_credentials)
                .pipe(
                  tap(this.loginObserver)
                );
  }


}
