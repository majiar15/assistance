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
      this.loginService.fetchAuthSession();
    }
  canActivate() {
    
    if(!this.loginService.isLogged){
      this.router.navigate(['/login']);
      return false;
    }
    this.loginService.fetchAuthSession();
      
    return true;
  }
  
}
