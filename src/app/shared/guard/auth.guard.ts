/**
 * we import libraries to use, especially AuthGuard for user validation and to protect our routes
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  
  /**
   * we validate the user authentication and that it exists in the localstorage
   * @param route path you want to access 
   * @param state route status
   * @returns returns true if the user exists
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate([''])
    }
    return true;
  }
  
}
