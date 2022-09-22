import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      usuario: 'admin',
      password: 'admin'
    }
  ]
  constructor() { }

  login(user: string, passwd: string): boolean{
    return this.usuarios.includes({usuario: user, password: passwd})
  }

  register(user: string, passwd: string): boolean{
    if (!this.usuarios.includes({usuario: user, password: passwd})){
      this.usuarios.concat({usuario: user, password: passwd})
      return true;
    }
    return false;
  }
}
