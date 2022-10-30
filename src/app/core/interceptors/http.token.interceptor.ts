import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}


// constructor(private jwtService: JwtService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const headersConfig = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     };

//     const token = this.jwtService.getToken();

//     if (token) {
//       headersConfig['Authorization'] = `Token ${token}`;
//     }

//     const request = req.clone({ setHeaders: headersConfig });
//     return next.handle(request);
//   }
