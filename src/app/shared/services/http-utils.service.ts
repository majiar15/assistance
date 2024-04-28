import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(
    private httpService: HttpService,
  ) { }


  postItem(path:any,data:any):Observable<any>{
    
    return this.httpService.post(`${path}`,data).pipe(map((response:any)=>{

      if(response.status){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  updateItem(path:any,data:any):Observable<any>{
    return this.httpService.put(`${path}`,data).pipe(map((response:any)=>{

      if(response.status){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  getItem(path:any){
    return this.httpService.get(path).pipe(map((response:any)=>{

      if(response.status){

        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  deleteItem(path:any){
    return this.httpService.delete(path).pipe(map((response:any)=>{

      if(response.status){
        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }
}
