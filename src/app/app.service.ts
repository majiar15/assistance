import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { decodedAccessToken } from './util/decodedToken';
import { HttpService } from './shared/services/http.service';
import { AcademicProgram, User } from './shared/interfaces/interfaces';
import { TeacherService } from './dashboard/teacher/teacher.service';
import { StudentsService } from './dashboard/students/students.service';
import { CoursesService } from './dashboard/courses/courses.service';
import { HttpUtilsService } from './shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string='';
  public academic_programs:AcademicProgram[]=[];
  public userData?:User;
  public showModal:boolean = false;
  
  public course_teacher:any[]=[];
  public courses:any[]=[];
  public student_assitance:any[]=[];
  
  constructor(
    
    private teacherService: TeacherService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private httpUtis: HttpUtilsService,
  ) { }

  startApp(){
    console.log("SE EJECUTO EL START");
    
    //Cargar Los cursos
    this.coursesService.start();
    //CARGAR LOS ESTUDIANTES
    this.studentsService.start();
    //CARGAR LOS PRFESORES
    this.teacherService.start();

    this.getAcademicProgram()


  }

  getAcademicProgram(){
    this.httpUtis.getItem('/academic-program').subscribe((response) => {
    if(response.valid){
      this.academic_programs=response.data;
    }

    });
  }






  

  


}
