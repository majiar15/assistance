import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HttpService } from "src/app/shared/services/http.service";
import { IpcRenderer} from "electron";

@Injectable({
    providedIn: 'root'
  })
  export class BitacoraService {
    
    bitacora :any=null;
    private ipc: any;

    constructor(
        private httpService: HttpService,
        private appService:AppService,
        ) { 
            if (window.require) {
                try {
                  this.ipc = window.require("electron").ipcRenderer;
                } catch (e) {
                  throw e;
                }
              } else {
                console.warn("Electron IPC was not loaded");
              }
        }

    createBitacora(data:any){
        return this.httpService.postItem('/assistance-teacher/create',data);
    }

    getBitacora(course_id:string){
        return this.httpService.getItem('/assistance-teacher/get-today/'+course_id);
    }

    public send(channel: string, ...args: any[]): void {
        if (!this.ipc) {
          return;
        }
        this.ipc.send(channel, ...args);
      }
  }