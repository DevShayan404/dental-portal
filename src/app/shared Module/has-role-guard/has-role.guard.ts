import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard  {

  constructor(private authService: AuthenticationService, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.hasRoleAuthentication(route);
  }


  async hasRoleAuthentication(route: any) {
    const user: UserModel | null = await this.authService.decodeToken(localStorage.getItem('token')!);
    if (user) {
      if (route.data['role'].includes(user.role)) {
      // if (user.role.includes(route.data['role'])) {

        return true;
      }
      else {
        // window.alert('You are not Authorized');
        this.route.navigate(['/dashboard/main-dashboard']);
        return false;
      }
    }
    else {
      this.route.navigate(['/dashboard/main-dashboard']);
      return false;
    }

  }

}
