import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { decodedAccessToken } from './util/decodedToken';
import { HttpService } from './shared/services/http.service';
import { User } from './shared/interfaces/interfaces';
import { TeacherService } from './dashboard/teacher/teacher.service';
import { StudentsService } from './dashboard/students/students.service';
import { CoursesService } from './dashboard/courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string='';

  
  public course_teacher:any[]=[];
  public courses:any[]=[];
  public student_assitance:any[]=[];
  public academic_programs:any[]=[];
  public userData?:User;
  constructor(
    
    private teacherService: TeacherService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) { }

  startApp(){
    console.log("🚀 ~ AppService ~ startApp ~ startApp:")
    //Cargar Los cursos
    this.coursesService.start();
    //CARGAR LOS ESTUDIANTES
    this.studentsService.start();
    //CARGAR LOS PRFESORES
    this.teacherService.start();



  }






  

  


}
