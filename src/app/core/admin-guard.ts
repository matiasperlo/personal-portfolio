import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, Subscriber, take } from "rxjs";
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
      console.log("There no exists JWT Token");
      this.router.navigateByUrl('/');
      return new Observable<boolean>( (subscriber) => {subscriber.next(false)});
    }

    console.log("There exists JWT Token");
    console.log(this.jwtUtil.getToken());

    return this.apiService.post('/user-roles', { jwt: this.jwtUtil.getToken()}).pipe(
      map( data => data != null && isRol(data) && data.rol == 'ROLE_ADMIN')
    )

  }
}