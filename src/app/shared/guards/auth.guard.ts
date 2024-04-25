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
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("🚀 ~ AuthGuard ~ canActivate ~ state:", state)
    console.log("🚀 ~ AuthGuard ~ canActivate ~ next:", next)
    const isSession=this.loginService.fetchAuthSession();
    if(isSession &&state.url.includes('login')){
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  
}
