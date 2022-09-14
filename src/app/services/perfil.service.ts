import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfil: Perfil[] = [
    {
      nombre: 'Cameron Williamson',
      perfil: 'Ing. de Software',
      email: 'williamson@office.com',
      sobremi: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam ex recusandae id. Exercitationem, quam debitis qui, vel culpa voluptate esse blanditiis est dolorem commodi ex veniam natus recusandae officia.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam ex recusandae id. Exercitationem, quam debitis qui, vel culpa voluptate esse blanditiis est dolorem commodi ex veniam natus recusandae officia.`
    }
  ];

  constructor() { }

  getPerfil(){
    return of(this.perfil);
  }
}
