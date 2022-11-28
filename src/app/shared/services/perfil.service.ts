import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class PerfilService {

  private api_url = "/perfil";

  constructor(
    private apiService: ApiService
  ) { }

  getPerfil(){
    return this.apiService.get(this.api_url + "/all");
  }

  postPerfil(data: Object){
    return this.apiService.post(this.api_url + "/register", data);
  }
}
