import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class SkillsService {
  private api_url = "/habilidades";

  constructor(
    private apiService: ApiService
  ) { }

  getSkills(){
    return this.apiService.get(this.api_url + "/all");
  }

  deleteHabilidad(id: number){
    return this.apiService.delete(this.api_url + "/delete/" + id);
  }

  postHabilidad(data: Object){
    return this.apiService.post(this.api_url + "/register", data );
  }
}
