import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HttpService } from "src/app/shared/services/http.service";


@Injectable({
    providedIn: 'root'
  })
  export class ModalAssistanceService {
    
    

    constructor(
        private httpService: HttpService,
        private appService:AppService,
        ) {
            
        }

    getAssistanceByStudent(student_id:string,course_id:string){
        return this.httpService.getItem(`/reports/student?student_id=${student_id}&course_id=${course_id}`);
    }

    
  }