import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private api_url = "/empresa";

  constructor(
    private apiService: ApiService
  ) { }

  getEmpresas(){
    return this.apiService.get(this.api_url + "/all");
  }
}
