import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HttpService } from "src/app/shared/services/http.service";


@Injectable({
    providedIn: 'root'
  })
  export class BitacoraService {
    
    bitacora :any=null;

    constructor(
        private httpService: HttpService,
        private appService:AppService,
        ) {
            
        }

    createBitacora(data:any){
        return this.httpService.postItem('/assistance-teacher/create',data);
    }

    getBitacora(course_id:string){
        return this.httpService.getItem('/assistance-teacher/get-today/'+course_id);
    }
  }