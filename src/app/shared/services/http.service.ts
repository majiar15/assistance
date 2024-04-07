import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl:string=environment.urlBaseMocks;
  public baseRetry: number = 4;
  static idtoken: string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3NTc3NDcuMTYwNzM3LCJ1c2VyX2lkIjoxLCJpc0FkbWluIjp0cnVlfQ.X-bWb5dlNKIMphzQRsfzb1_P0omn5wDC36nKaYg-0aE';

  constructor(
    public http: HttpClient,
  ) { }

  getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + HttpService.idtoken
    })

    return ({ headers });
  }

  getHeadersGET(): any {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + HttpService.idtoken
    })

    return ({ headers });
  }

  public get(path:string, header?:any) {
    header = header !== false ? (header || this.getHeadersGET()) : header;
    console.log("🚀 ~ HttpService ~ get ~ header:", header)
    return this.http.get(this.baseUrl+path, header);
  }

  public post(path: string, data: any, header?:any) {
    
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.post(this.baseUrl+path, data, header);
  }

  public put(path: string, data: any,header?:any) {
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.put(this.baseUrl+path, data, header);
  }

  public delete(path: string, header?:any) {
    header = header !== false ? (header || this.getHeaders()) : header;
    return this.http.delete(this.baseUrl+path, header);
  }


  public resValid(resData: any): any {
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Respond with null or undefined' };
      } else if (resData.hasOwnProperty('statusCode')) {
        if (resData.statusCode) {
          if (resData.hasOwnProperty('data')) {
            return { valid: true, print: resData };
          } else {
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
}
