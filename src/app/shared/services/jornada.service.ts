import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  private api_url = "/jornadas";

  constructor(
    private apiService: ApiService
  ) { }

  getJornadas(){
    return this.apiService.get(this.api_url + "/all");
  }
}
