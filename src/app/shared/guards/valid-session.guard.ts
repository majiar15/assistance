import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AppService } from "src/app/app.service";
import { LoginService } from "src/app/auth/login/login.service";


@Injectable({
  providedIn: 'root'
})
export class ValidSessionGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private appService: AppService,
  ) { }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("🚀 ~ ValidSessionGuard :",)
    

    try {
      const isSession = await this.loginService.fetchAuthSession();
      
      if (isSession && state.url.includes('login')) {
        this.router.navigate(['/dashboard']);
        return false; // Impide la navegación
      } else if (!isSession) {
        this.router.navigate(['/login']);

        return false;
      }
      this.appService.startApp();
      return true;
    } catch (error) {
      console.error("Error fetching auth session", error);
      return false;
    }


    //this.loginService.fetchAuthSession();

    // return this.router.parseUrl('/login')
    

  }

}
