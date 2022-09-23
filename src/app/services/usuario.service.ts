import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      usuario: 'admin',
      password: 'admin'
    },
    {
      usuario: 'guest',
      password: ''
    }
  ];

  constructor() { }
  
  private existeUser(user: string): Usuario | undefined {
    return this.usuarios.find(function (element) {
      return element.usuario == user;
    });

    // for (let i = 0; i < this.usuarios.length; i++){
    //   if (this.usuarios[i].usuario == usuario.usuario && this.usuarios[i].password == usuario.password){
    //     return true;
    //   }
    // }
    // return false;
  }

  login(user: string, passwd: string): boolean{
    let match = this.existeUser(user);
    if (match == undefined){
      return false;
    }
    return match.password == passwd;
  }

  register(user: string, passwd: string): boolean{
    if(!this.existeUser(user)){
      this.usuarios.push({usuario: user, password: passwd});
      return true;
    }
    return false;
  }
}
