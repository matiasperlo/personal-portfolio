import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Usuario } from '../models/usuario';
import { environment  as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  login(username: string, password: string){
    return this.http.post<Usuario>(`${env.apiUrl}/login`, {username, password});
    // .shareReplay();
  }
}
