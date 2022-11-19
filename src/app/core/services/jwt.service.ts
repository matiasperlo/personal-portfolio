import { Injectable } from '@angular/core';

/**
 * Servicio que maneja el almacenamiento local del JWT, incluye acciones basicas.
 */
@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  guardarToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destruirToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
