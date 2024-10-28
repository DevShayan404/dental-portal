import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutGuard  {
  constructor(private authService: AuthenticationService, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.authService.isAuthenticated()) {
        this.route.navigate(['dashboard/main-dashboard']); // Redirect to dashboard if authenticated
        return false;
      }
      return true;
  }
  
}
