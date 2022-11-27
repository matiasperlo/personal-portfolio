import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ProyectosService {

  private api_url = "/proyectos";

  constructor(
    private apiService: ApiService
  ) { }

  getProyectos(){
    return this.apiService.get(this.api_url + "/all");
  }

  deleteProyecto(id: number) {
    return this.apiService.delete(this.api_url + "/delete/" + id);
  }

  postProyecto(proyecto: Object){
    return this.apiService.post(this.api_url + "/register", proyecto);
  }
}
