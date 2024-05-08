import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { map, Observable, of, Subject } from 'rxjs';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public modal = false;
  public isLogged=false;
  
  constructor(
    private httpService: HttpService,
    private appService:AppService,
    ) { }



  signIn(data:any): Observable<any>{
    return this.httpService.post(`/auth/login`,data).pipe(map((resp:any)=>{
    
      if(resp.data!=null){
        
        localStorage.setItem('token',resp.token); 
        HttpService.idtoken=resp.token
        return {valid:true, data:resp.data}
      }else{
        return {valid:false, data:''}
      }
    }))
  }


  fetchAuthSession():boolean{
    
    if(localStorage.getItem('token') && localStorage.getItem('token')  != null ){

      const payload = decodedAccessToken( localStorage.getItem('token') || '');
      if (!payload) return false;
      
      if(payload.exp < (new Date().getTime() / 1000)){
        console.log("vencido");
        
        this.isLogged=false;
        this.modal=true;
        localStorage.removeItem('token');
        return false;
      }
      HttpService.idtoken=localStorage.getItem('token')||'';
      this.appService.userData={
        name:payload.name,
        surnames:payload.surnames,
        email:payload.email,
        dni:payload.dni,
        phone:payload.phone,
        role:payload.role,
        _id:payload.id,
      };


      this.isLogged=true;
      this.appService.token=localStorage.getItem('token')||'';
      return true;
    }
    return false;
  }
  validAdmin(): boolean{
    if(localStorage.getItem('token') && localStorage.getItem('token')  != null ){

      const payload = decodedAccessToken( localStorage.getItem('token') || '');
      if (!payload) return false;

      if(payload.role=='admin'){
        return true;
      }

    }
    return false;

  }

}
