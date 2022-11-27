import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class PerfilService {

  private api_url = "/perfil";

  constructor(
    private apiService: ApiService
  ) { }

  getPerfil(){
    return this.apiService.get(this.api_url);
  }
}
