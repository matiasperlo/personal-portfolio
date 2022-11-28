import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class EducacionService {
  private api_url = "/educacion";

  constructor(
    private apiService: ApiService
  ) { }

  getEducaciones(){
    return this.apiService.get(this.api_url + "/all");
  }

  postEducacion(data: Object){
    return this.apiService.post(this.api_url + "/register", data);
  }

  deleteEducacion(id: number){
    return this.apiService.delete(this.api_url + "/delete/" + id);
  }
}
