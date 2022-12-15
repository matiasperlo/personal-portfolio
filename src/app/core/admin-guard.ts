import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, Subscriber, take, tap } from "rxjs";
import { isRol, Rol } from "../shared/models/rol";
import { UserService } from "./services";
import { ApiService } from "./services/api.service";
import { JwtService } from "./services/jwt.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtUtil: JwtService,
    private userService: UserService,
    private apiService: ApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    
    if(typeof this.jwtUtil.getToken() == 'undefined'){
      this.router.navigateByUrl('/forbidden');
      return new Observable<boolean>( (subscriber) => {subscriber.next(false)});
    }

    return this.apiService.post('/user-roles', { jwt: this.jwtUtil.getToken()}).pipe(
      map( response => response != null && isRol(response) && response.rol == 'ROLE_ADMIN'),
      tap( ok => {
        if (!ok){
          this.router.navigateByUrl('/forbidden');
        };
      })
    )

  }
}