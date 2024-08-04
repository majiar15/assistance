import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { CoursesService } from '../courses/courses.service';
import { Course, Student,Response } from 'src/app/shared/interfaces/interfaces';
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  enrolledStudents?: Response<Student>;
  unenrolledStudents?: Response<Student>;
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
    return this.httpService.getItem(`/courses/search?name=${name}`)
  }

  searchStudents(name:string,course_id:string):Observable<any>{
    
    return this.httpService.getItem(`/students/search-not-enrolled?name=${name}&course_id=${course_id}`)
  }

  enrollStudents(data:any):Observable<any>{
    
    return this.httpService.postItem('/enroll',data)
  }

  uploadFile(data:FormData):Observable<any>{
    
    return this.httpService.postFile('/enroll/upload',data)
  }

  getStudentsEnrolled(course_id:string):Observable<Response<Student>>{
    
    return this.httpService.getItem(`/students/enrolled?course_id=${course_id}`)
  }
  getUnenrolledStudents(course_id:string):Observable<Response<Student>>{
    
    return this.httpService.getItem(`/students/not-enrolled?course_id=${course_id}`)
  }

  public getMore( path:string,page:number,limit:number,course_id:string):Observable<Response<Student>>{
    return this.httpService.getItem(`/students${path}?page=${page}&limit=${limit}&course_id=${course_id}`);
  }

  default(){
    this.enrolledStudents = undefined;
    this.unenrolledStudents = undefined;
  }
}
