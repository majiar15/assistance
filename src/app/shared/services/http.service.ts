import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Response} from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl:string=environment.domain;
  public baseRetry: number = 4;
  static idtoken: string='';

  constructor(
    public http: HttpClient,
  ) { }

  private getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + HttpService.idtoken
    })

    return ({ headers });
  }

  private getHeadersFiles(): any {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + HttpService.idtoken
    })

    return ({ headers });
  }


  private getHeadersGET(): any {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + HttpService.idtoken
    })

    return ({ headers });
  }

  private get(path:string, header?:any) {
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.get(this.baseUrl+path, header);
  }

  public post(path: string, data: any, header?:any) {
    
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.post(this.baseUrl+path, data, header);
  }

  private put(path: string, data: any,header?:any) {
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.put(this.baseUrl+path, data, header);
  }

  private delete(path: string, header?:any) {
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.delete(this.baseUrl+path, header);
  }


  public postItem(path:any,data:any):Observable<any>{
    
    return this.post(`${path}`,data).pipe(
      map(response => this.resValid(response)),
      catchError(this.handleError)
    );
  }

  public postFile(path:any,data:any):Observable<any>{
    
    return this.post(`${path}`,data,this.getHeadersFiles()).pipe(
      map(response => this.resValid(response)),
      catchError(this.handleError)
    );
  }

  public updateItem(path:any,data:any):Observable<any>{
    return this.put(`${path}`,data).pipe(
      map(response => this.resValid(response)),
      catchError(this.handleError)
    );
  }

  public getItem(path:any):Observable<any>{
    return this.get(path).pipe(
      map(response => this.resValid(response)),
      catchError(this.handleError)
    );
  }

  public getItemBlob(path:any):Observable<Blob>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + HttpService.idtoken,
    });

    // @ts-ignore
    return this.http.get(this.baseUrl+path, {
      headers: headers,
      responseType: 'blob',
    });
  }

  public deleteItem(path:any):Observable<any>{
    return this.delete(path).pipe(
      map(response => this.resValid(response)),
      catchError(this.handleError)
    );
  }


  public resValid(resData: any): any {
    
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { valid: false, msg: 'Respond with null or undefined' };
      } else if (resData.hasOwnProperty('status')) {
        if (resData.status) {
          if (resData.hasOwnProperty('data') && resData.hasOwnProperty('metadata')) {
            resData = this.mapResponse(resData);
            return { valid: true, data: resData.data, metadata:resData.metadata };
          } else if(resData.hasOwnProperty('data')){
            return { valid: true, data: resData.data, };
          }else if(resData.hasOwnProperty('message')){
            return { valid: true, message: resData.message, };
          }
          else {
            return { valid: false, msg: 'Response does not contain the [data] property' };
          }
        } else {
          return { valid: false, msg: 'Response contains false value in [status] property' };
        }
      } else {
        return { valid: false, msg: 'Response does not contain the [statusCode] property' };
      }
    } else {
      return { valid: false, msg: 'Response does not contain a valid json' };
    }
  }

  public isJsonString(strJson: string): boolean {
    // Validar JSON
    try {
      JSON.parse(strJson);
    } catch (e) {
      return false;
    }
    return true;
  }


  public handleError(err: any): Observable<never> {
    
    let message ='';
    if (err?.error?.message) {
      if (Array.isArray(err?.error?.message)) {
        message = err?.error?.message[0];
      } else {
        message = err?.error?.message;
      }
    }else{
      message = err?.error?.message;
    }


    return throwError(() => new Error(message || 'Server Error'));
  }

  private mapResponse(response:Response<any>){
    
    response.data = response.data.map((value)=>{
      if(response.metadata){
        value['page'] = response.metadata.page;
      }
      return value;
    })
    return response;
  }
}
