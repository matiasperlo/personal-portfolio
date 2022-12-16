import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { AdminGuard } from './admin-guard';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';



@NgModule({
  declarations: [
    ModalDialogComponent,
    ModalLoadingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    ApiService,
    AdminGuard
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}