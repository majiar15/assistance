import { Injectable } from '@angular/core';
import { SelectedCourse } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCoursesService {

  selectedCourse:SelectedCourse = {_id:"",name:""};
  courseBitacora:any;

  constructor(
    private httpService: HttpService,
  ) { }


  fetchCourses(){

    return this.httpService.getItem('/courses');
  }

  getLastAssist(courseId: string){

    return this.httpService.getItem(`/assistance/last/${courseId}`);
  }

  getStudentsEnrolled(courseId: string){

    return this.httpService.getItem(`/enroll/student/${courseId}`);
  }

  getAsistanceByDate(courseId: string, date: String){
    return this.httpService.getItem(`/assistance/date?date=${date}&courseId=${courseId}`);
  }
  takeAssitance(courseId: string, studentId: string){
    return this.httpService.postItem(
      `/assistance/take/teacher`,
      {
        "courseId": courseId,
        "studentId": studentId
      }
    );
  }

  inProgress(){
    return this.httpService.getItem(`/courses/in-progress`);
  }


}
