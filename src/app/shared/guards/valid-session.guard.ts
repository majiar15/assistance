import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "src/app/auth/login/login.service";


@Injectable({
  providedIn: 'root'
})
export class ValidSessionGuard implements CanActivate{

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("🚀 ~ VALID SESSION ~ state:", state)
    console.log("🚀 ~ VALID SESSION ~ next:", next)
    
    const isSession=this.loginService.fetchAuthSession();
    console.log("🚀 ~ ESTA LOGUEADO:", isSession)
    if(isSession &&state.url.includes('login')){
      this.router.navigate(['/dashboard']);
      return false; // Impide la navegación
    }else if(!isSession){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
    //this.loginService.fetchAuthSession();
      
    // return this.router.parseUrl('/login')
    
  }
}
