import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    JwtService,
    AuthGuardService,
    UserService
  ],
})
export class CoreModule { }


// providers: [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
//   ApiService,
//   ArticlesService,
//   AuthGuard,
//   CommentsService,
//   JwtService,
//   ProfilesService,
//   TagsService,
//   UserService
// ],