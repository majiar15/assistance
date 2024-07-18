import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

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
    private httpService: HttpService
  ) { }

  start(){

    this.httpService.getItem('/courses').subscribe((response) => {
      if(response.valid){
        this.courses=response.data;
        this.coursesSubject.next(this.courses);
      }
    })
  }


  asignarCourse(data:any){
    return this.httpService.postItem('/courses',data)
  }
}
