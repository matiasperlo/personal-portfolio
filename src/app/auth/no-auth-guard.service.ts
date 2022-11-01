import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
      return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
    }
}
