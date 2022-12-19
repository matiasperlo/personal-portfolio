import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../root/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    
    const req = request.clone({setHeaders: headersConfig});
    return next.handle(req);
  }
}
