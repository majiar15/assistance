import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl=environment.urlBase
  public token: string='';
 
  constructor(
    private http: HttpClient,
  ) { }


  getHeadersLambda(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return ({ headers: headers });
  }

  postItem(path:any,data:any):Observable<any>{
    console.log("Post",this.getHeadersLambda());
    
    return this.http.post(`${this.baseUrl}${path}`,data,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  updateItem(path:any,data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}${path}`,data,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  getItem(path:any){
    return this.http.get(`${this.baseUrl}${path}`,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }

  deleteItem(path:any){
    return this.http.delete(`${this.baseUrl}${path}`,this.getHeadersLambda()).pipe(map((response:any)=>{

      if(response.data){
        return {valid:true,data:response.data,message:response.message}
      }else{
        return {valid:false,data:null,message:response.message}
      }
    }))
  }
}
