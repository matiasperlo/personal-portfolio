import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  setSubTitle(subtitle: string){
    document.title = environment.appName + ` - ${subtitle}`;
  }
}
