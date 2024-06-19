import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Course } from 'src/app/shared/interfaces/interfaces';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  coursesSubject = new Subject<Course[]>();

  courses:Course[] = [];
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
        this.coursesSubject.next(this.courses);
      }
    })
  }


  asignarCourse(data:any){
    return this.httpUtis.postItem('/courses',data)
  }
}
