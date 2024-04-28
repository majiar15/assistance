import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/login/login.service';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    valid: boolean = false;
  constructor(
    private loginService: LoginService,
    private appService:AppService,
    private router: Router
    ) { 
      this.valid = this.loginService.validAdmin();
    }
  canActivate() {
    
    if(this.valid){
      this.router.navigate(['/enroll']);
      return false;
    }
    this.valid = this.loginService.validAdmin();
    this.appService.startApp();
      
    return true;
  }
  
}
