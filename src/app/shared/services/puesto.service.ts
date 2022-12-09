import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";

@Injectable()
export class PuestoService {
    private url_api = '/puestos';

    constructor(private apiService: ApiService){}

    getPuestos(){
        return this.apiService.get(this.url_api + '/all');
    }
}