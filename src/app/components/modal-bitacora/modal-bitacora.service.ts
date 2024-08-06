import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HttpService } from "src/app/shared/services/http.service";
import { IpcRenderer} from "electron";
import { IpcService } from "src/app/ipc.service";

@Injectable({
    providedIn: 'root'
  })
  export class BitacoraService {
    
    bitacora :any=null;

    constructor(
        private httpService: HttpService,
        private appService:AppService,
        private ipc: IpcService
        ) {
            this.openQRPage();
        }

    createBitacora(data:any){
        return this.httpService.postItem('/assistance-teacher/create',data);
    }

    getBitacora(course_id:string){
        return this.httpService.getItem('/assistance-teacher/get-today/'+course_id);
    }

    openQRPage(){
        this.ipc.send('open-qr-window')
    }
  }