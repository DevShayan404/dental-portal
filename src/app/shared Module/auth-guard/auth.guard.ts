import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private service: AuthenticationService, private route: Router) {

  }
  canActivate() {
    if(this.service.isAuthenticated()){
      this.service.decodeToken(localStorage.getItem('token')!);
      // alert('auth active hai')
    return true;

    }else{
      // alert('auth non active hai')
      this.route.navigate(['/authentication/login']);
      return false;
    }
    // return true;
  }

}
