import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }
  
  setAuth(user: User){
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(){
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials: any){
    return this.apiService.post('/auth', {user: credentials})
    .pipe(map(data => {
      this.setAuth(data.user);
      return data;
    }))
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
