import { Injectable } from '@angular/core';
import { HttpService } from './shared/services/http.service';
import { AcademicProgram, User } from './shared/interfaces/interfaces';
import { TeacherService } from './dashboard/teacher/teacher.service';
import { StudentsService } from './dashboard/students/students.service';
import { CoursesService } from './dashboard/courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string = '';
  public academic_programs: AcademicProgram[] = [];
  public userData?: User;
  public showModal: boolean = false;

  public course_teacher: any[] = [];
  public courses: any[] = [];
  public student_assitance: any[] = [];

  constructor(

    private teacherService: TeacherService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private httpService: HttpService,
  ) { }

  startApp() {
    console.log("SE EJECUTO EL START");

    //Cargar Los cursos
    this.coursesService.start();
    //CARGAR LOS ESTUDIANTES
    this.studentsService.start();
    //CARGAR LOS PRFESORES
    

    this.getAcademicProgram()


  }

  getAcademicProgram() {
    this.httpService.getItem('/academic-program').subscribe((response) => {
      if (response.valid) {
        this.academic_programs = response.data;
      }

    });
  }











}
