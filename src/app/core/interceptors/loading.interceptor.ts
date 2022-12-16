import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { JwtService } from '../root/jwt.service';
import { ModalDialogService } from '../root/modal-dialog.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private modalService: ModalDialogService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let NoBloquearPantalla = request.headers.get("NoBloquearPantalla");   //EnTypeahead
    if (!NoBloquearPantalla) this.modalService.BloquearPantalla();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 handled in auth.interceptor
        if (
          // error.status !== 401 &&
          // error.error &&
          error.error.ExceptionMessage
        ) {
          this.modalService.Alert(error.error.ExceptionMessage, "Error", "d");
        }
        
        return throwError(error);
      }),
      finalize(() => {
        if (!NoBloquearPantalla) this.modalService.DesbloquearPantalla();
      })
    );
  }
}