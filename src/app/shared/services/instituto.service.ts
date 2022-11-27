import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  private api_url = "/instituto"
  
  constructor(
    private apiService: ApiService
  ) { }

  getInstituciones() {
    return this.apiService.get(this.api_url + "/all");
  }

  postInstituto(data: Object){
    return this.apiService.post(this.api_url + "/register", data);
  }
}
