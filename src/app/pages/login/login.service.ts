import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { map, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


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
      this.isLogged=true;
      this.appService.token=localStorage.getItem('token')||'';
    } 
  }

}
