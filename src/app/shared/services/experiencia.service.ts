import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ExperienciaService {

  private exp_path = "/experiencias";

  constructor(
    private apiService: ApiService
  ) { }

  getExperiencias(){
    return this.apiService.get(this.exp_path + '/all');
    // return of(this.experiencias);
  }

  deleteExperiencia(id: number){
    return this.apiService.delete(this.exp_path + "/delete/" + id)
  }

  postExperiencia(data: Object){
    return this.apiService.post(this.exp_path + "/register", data);
  }
}
