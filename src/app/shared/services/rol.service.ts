import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private api_url = "/rol";

  constructor(
    private apiService: ApiService
  ) { }

  getRoles(){
    return this.apiService.get(this.api_url + "/all");
  }
}
