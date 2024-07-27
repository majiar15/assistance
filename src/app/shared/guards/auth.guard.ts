import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

     
      try {
      
        let isSession = await this.loginService.fetchAuthSession();
        if (isSession && state.url.includes('login')) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          this.loginService.logout();
          
          return true;
        }
      } catch (error) {
        console.error("Error fetching auth session", error);
        return false;
      }
      
    
    




  }

}
