import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeCoursesComponent } from "./home-courses/home-courses.component";
import { StudentsComponent } from "./students/students.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { CoursesComponent } from "./courses/courses.component";
import { ValidSessionGuard } from "../shared/guards/valid-session.guard";
import { TeacherListComponent } from "./teacher/teacher-list/teacher-list.component";
import { RegisterTeacherComponent } from "./teacher/register-teacher/register-teacher.component";
import { CoursesListComponent } from "./courses/courses-list/courses-list.component";
import { CreateCourseComponent } from "./courses/create-course/create-course.component";

const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children:[
      { path: '', component: HomeCoursesComponent, pathMatch: 'full' }, // Ruta hija vacía que carga AboutComponent
      { path: 'students', component: StudentsComponent },
      { path: 'courses', component: CoursesComponent,
        children:[
        { path: '', component: CoursesListComponent },
        { path: 'create', component: CreateCourseComponent },
        { path: ':id', component: CreateCourseComponent },
      ] 
       },
      { path: 'teachers', component: TeacherComponent,
      children:[
        { path: '', component: TeacherListComponent },
        { path: 'create', component: RegisterTeacherComponent },
        { path: ':id', component: RegisterTeacherComponent },
      ] 
    },
      // { path: 'assistance', component: AssignCourseComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
  ],
    canActivate:[ValidSessionGuard]
  },
    
  ];

  export default routes;
  