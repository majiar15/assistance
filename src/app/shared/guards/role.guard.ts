import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRole = next.data['expectedRole'] as string[];;
    const user = this.appService.userData
        
    // Permitir acceso si el usuario tiene el rol esperado
    if ( expectedRole.includes(user!.role)) {
      return true;
    }
    if(user?.role==='teacher'){
        return this.router.createUrlTree(['/dashboard']);
    }
    if(user?.role==='admin'){
        return this.router.createUrlTree(['/dashboard/enroll']);
    }
    // Redirigir a una página no autorizada o a la página de inicio de sesión
    return this.router.createUrlTree(['/dashboard']);
  }
}