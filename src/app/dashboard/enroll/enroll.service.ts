import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/app/shared/interfaces/interfaces';
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  courses: Course[] = [];

  constructor(
    private httpService: HttpService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) { }

  start(){
    // this.coursesService.coursesSubject.subscribe((courses) => {
    //   this.courses = courses;
    // })
    // this.studentsService.studentsSubject.subscribe((student)=>{
    //   this.students = this.formatData(student);
    // })
  }

  searchCourse(name:string):Observable<any>{
    return this.httpService.get(`/courses/search?name=${name}`).pipe(map((response:any)=>{

      if(response.status){

        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  searchStudents(name:string):Observable<any>{
    
    return this.httpService.get(`/students/search?name=${name}`).pipe(map((response:any)=>{

      if(response.status){

        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }

  enrollStudents(data:any):Observable<any>{
    
    return this.httpService.post('/enroll',data).pipe(map((response:any)=>{

      if(response.status){

        return {valid:true,data:response.data,message:''}
      }else{
        return {valid:false,data:null,message:''}
      }
    }))
  }
}
