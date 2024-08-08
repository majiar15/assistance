import { Injectable } from '@angular/core';
import { HttpService } from './shared/services/http.service';
import { AcademicProgram, User ,Response } from './shared/interfaces/interfaces';
import { CoursesService } from './dashboard/courses/courses.service';
import { EnrollService } from './dashboard/enroll/enroll.service';
import { StudentsService } from './dashboard/students/students.service';
import { TeacherService } from './dashboard/teacher/teacher.service';
import { HomeCoursesService } from './dashboard/home-courses/home-courses.service';
import { BitacoraService } from './components/modal-bitacora/modal-bitacora.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public academic_programs: AcademicProgram[] = [];
  public userData?: User;
  


  constructor(
    private httpService: HttpService,
    private coursesService: CoursesService,
    private enrollService: EnrollService,
    private studentsService: StudentsService,
    private teacherService: TeacherService,
    private homeCoursesService: HomeCoursesService,
    public bitacoraService: BitacoraService,
  ) { }

  startApp() {
    this.getAcademicProgram().subscribe((response) => {
      if (response.valid) {
        this.academic_programs = response.data;
      }

    })


  }

  getAcademicProgram() {
    return this.httpService.getItem('/academic-program');
  }



  default(){
    this.userData=undefined;
    this.academic_programs = [];
    this.coursesService.default();
    this.enrollService.default();
    this.studentsService.default();
    this.teacherService.default();
    this.homeCoursesService.default();
    this.bitacoraService.closeQr();
  }

}
