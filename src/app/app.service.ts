import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { decodedAccessToken } from './util/decodedToken';
import { HttpService } from './shared/services/http.service';
import { User } from './shared/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string='';

  public teacher:any[]=[];
  public course_teacher:any[]=[];
  public courses:any[]=[];
  public student_assitance:any[]=[];
  public userData?:User;
  constructor(
    private httpSeervice: HttpService,
  ) { }


  

  postItem(path:any,data:any):Observable<any>{
    
    return this.httpSeervice.post(`${path}`,data).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  updateItem(path:any,data:any):Observable<any>{
    return this.httpSeervice.put(`${path}`,data).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  getItem(path:any){
    return this.httpSeervice.get(path).pipe(map((response:any)=>{

      if(response.data){

        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  deleteItem(path:any){
    return this.httpSeervice.delete(path).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }


}
