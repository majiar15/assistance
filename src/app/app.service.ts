import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { decodedAccessToken } from './util/decodedToken';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string='';

  public teacher:any[]=[];
  public course_teacher:any[]=[];
  public courses:any[]=[];
  public student_assitance:any[]=[];
  constructor(
    private http: HttpClient,
  ) { }


  getHeadersLambda(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
    })

    return ({ headers: headers });
  }

  postItem(path:any,data:any):Observable<any>{
    console.log("Post",this.getHeadersLambda());
    
    return this.http.post(`${path}`,data,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  updateItem(path:any,data:any):Observable<any>{
    return this.http.put(`${path}`,data,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  getItem(path:any){
    return this.http.get(`${path}`,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  deleteItem(path:any){
    return this.http.delete(`${path}`,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }


}
