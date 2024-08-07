import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedCourse } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCoursesService {

  selectedCourse:SelectedCourse = {_id:"",name:""};
  courseBitacora:any;

  public inClass = false;
  private intervalId: any;
  private intervalSubject = new BehaviorSubject<boolean>(false);
  intervalActive$ = this.intervalSubject.asObservable();
  constructor(
    private httpService: HttpService,
  ) { }


  fetchCourses(){

    return this.httpService.getItem('/courses');
  }

  getLastAssist(courseId: string){

    return this.httpService.getItem(`/assistance/last/${courseId}`);
  }
  getScheduleByCourse(courseId: string){

    return this.httpService.getItem(`/courses/schedule-by/course/${courseId}`);
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

  getBitacora(course_id:string){
    return this.httpService.getItem('/assistance-teacher/get-today/'+course_id);
  }
  updateSecret(){
    return this.httpService.postItem(
      '/assistance-teacher/update-secret',
      {
        bitacora_id: this.courseBitacora._id,
        secret: this.createNewSecret()
      }
    );
  }
  createNewSecret(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);

    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  }
  startInterval(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.updateSecret();
      }, 1000);
      this.intervalSubject.next(true);
    }
  }

  stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.intervalSubject.next(false);
    }
  }

  private doSomething(): void {
    console.log('actualizando QR');
  }
}
