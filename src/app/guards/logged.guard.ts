import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { 
      this.loginService.fetchAuthSession();
    }
  canActivate() {

    if(this.loginService.isLogged){
      this.router.navigate(['/home'])
    }

    return true;
  }
  
}
