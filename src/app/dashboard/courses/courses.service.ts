import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Course, Response, User } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses:Response<Course> = {data:[],valid:false};
  teachers:User[] = [];
  schedule:any[]=[];
  intensity=0;
  constructor(
    private httpService: HttpService
  ) { }

  asignarCourse(data:any){
    return this.httpService.postItem('/courses',data)
  }


  public createCourse(data: any): Observable<any> {
    return this.httpService.postItem('/courses',data)
  }

  public updateCourse(course_id:string,data:any){
    return this.httpService.updateItem(`/courses/${course_id}`,data)
  }

  public deleteCourse(course_id:string){
    return this.httpService.deleteItem(`/courses/${course_id}`)
  }

  public searchCourse(name:string):Observable<any>{
    return this.httpService.getItem(`/courses/search?name=${name}`)
  }

  public getCourse(course_id:string){
    return this.httpService.getItem(`/courses/${course_id}`);
  }

  public getCourses(): Observable<Response<Course>>{
    return this.httpService.getItem('/courses');
  }
  public getMoreCourse(page:number,limit:number): Observable<Response<Course>>{
    return this.httpService.getItem(`/courses?page=${page}&limit=${limit}`);
  }


  default(){
    this.courses={data:[],valid:false};
    this.teachers=[];
    this.schedule=[];
    this.intensity=0;
  }
}
