import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses:any[] = [];
  schedule:any[]=[];
  intensity=0;
  intensityBefore=0
  constructor(
    
    private httpUtis: HttpUtilsService
  ) { }

  start(){

    this.httpUtis.getItem('/courses').subscribe((response) => {
      if(response.valid){
        this.courses=response.data;
      }
      console.log("🚀 ~ TeacherService :", response)

    })
  }


  asignarCourse(data:any){
    return this.httpUtis.postItem('/courses',data)
  }
}
