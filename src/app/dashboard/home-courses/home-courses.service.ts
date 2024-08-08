import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BitacoraService } from 'src/app/components/modal-bitacora/modal-bitacora.service';
import { SelectedCourse } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCoursesService {

  selectedCourse:SelectedCourse = {_id:"",name:""};
  courseBitacora:any;
  courseInProgress:any;

  public inClass = false;
  private intervalId: any;
  private intervalSubject = new BehaviorSubject<boolean>(false);
  intervalActive$ = this.intervalSubject.asObservable();
  constructor(
    private httpService: HttpService,
    public bitacoraService: BitacoraService,
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


  updateSecret(secret:string){
    return this.httpService.postItem(
      '/assistance-teacher/update-secret',
      {
        bitacora_id: this.courseBitacora._id,
        secret: secret
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
        const secret = this.createNewSecret();
        this.bitacoraService.updateQR(secret)
        this.updateSecret(secret).subscribe((response)=>{
          if(response.valid && !response.data.inClass){
            this.bitacoraService.closeQr();
            this.stopInterval();
          }
        });
      }, 3000);
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

  default(){
    this.stopInterval()
    this.selectedCourse={_id:"",name:""};


    this.courseBitacora=null;
    this.courseInProgress=null;
    this.inClass = false;
    this.intervalId=null;
    this.intervalSubject.unsubscribe();
    
  }
}
