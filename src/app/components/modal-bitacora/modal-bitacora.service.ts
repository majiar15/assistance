import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HttpService } from "src/app/shared/services/http.service";


@Injectable({
    providedIn: 'root'
  })
  export class BitacoraService {
    
    bitacora :any=null;
    private ipcRenderer: any;

    constructor(
        private httpService: HttpService,
        private appService:AppService,
        ) { 
            if (window && (window as any).require) {
                this.ipcRenderer = (window as any).require('electron').ipcRenderer;
              }
        }

    createBitacora(data:any){
        return this.httpService.postItem('/assistance-teacher/create',data);
    }

    getBitacora(course_id:string){
        return this.httpService.getItem('/assistance-teacher/get-today/'+course_id);
    }

    windowQR(windowType:string){
        if (this.ipcRenderer) {
            this.ipcRenderer.send('open-window', windowType);
          }
    }
  }