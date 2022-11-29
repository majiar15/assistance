import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { map, Observable, of, Subject } from 'rxjs';
import { decodedAccessToken } from 'src/app/util/decodedToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public modal = false;
  public isLogged=false;
  
  constructor(
    private http: HttpClient,
    private appService:AppService,
    ) { }



  signIn(data:any): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      
    });
    return this.http.post(`api/auth/login`,data,{headers}).pipe(map((resp:any)=>{
      

      
      if(resp.data!=null){
        
        localStorage.setItem('token',resp.data); 
        this.appService.token=resp.data;
        return {valid:true, data:resp.data, message:resp.message}
      }else{
        return {valid:false, data:'', message:resp.message}
      }
    }))
  }


  fetchAuthSession(){
    if(localStorage.getItem('token') && localStorage.getItem('token')  != null ){

      const payload = decodedAccessToken( localStorage.getItem('token') || '');
      if (!payload) return;

      console.log("verificando...", (payload && payload.exp  < new Date().getTime()));
      console.log(payload);
      console.log(payload.exp < new Date().getTime());
      if(payload.exp < (new Date().getTime() / 1000)){
        console.log("vencido");
        
        this.isLogged=false;
        this.modal=true;
        localStorage.removeItem('token');
        return;
      }



      this.isLogged=true;
      this.appService.token=localStorage.getItem('token')||'';
    } 
  }
  validAdmin(): boolean{
    if(localStorage.getItem('token') && localStorage.getItem('token')  != null ){

      const payload = decodedAccessToken( localStorage.getItem('token') || '');
      if (!payload) return false;

      
      if(payload.isAdmin){
        return true;
      }

    }
    return false;

  }

}
