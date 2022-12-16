import { Injectable } from '@angular/core';

/**
 * Servicio que maneja el almacenamiento local del JWT, incluye acciones basicas.
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): String {
    return window.sessionStorage['jwtToken'];
  }

  guardarToken(token: String) {
    window.sessionStorage['jwtToken'] = token;
  }

  destruirToken() {
    window.sessionStorage.removeItem('jwtToken');
  }
}
