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
import { StudentsListComponent } from "./students/students-list/students-list.component";
import { RegisterStudentComponent } from "./students/register-student/register-student.component";
import { EnrollComponent } from "./enroll/enroll.component";
import { SelectCourseComponent } from "./enroll/select-course/select-course.component";
import { SelectStudentsComponent } from "./enroll/select-students/select-students.component";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      { path: '', component: HomeCoursesComponent, pathMatch: 'full' }, // Ruta hija vacía que carga AboutComponent
      {
        path: 'students', component: StudentsComponent,
        children: [
          { path: '', component: StudentsListComponent },
          { path: 'create', component: RegisterStudentComponent },
          { path: ':id', component: RegisterStudentComponent },
        ]

      },
      {
        path: 'assistance', component: StudentsComponent,
        children: [
          { path: '', component: StudentsListComponent },
          { path: 'create', component: RegisterStudentComponent },
          { path: ':id', component: RegisterStudentComponent },
        ]
      },
      {
        path: 'courses', component: CoursesComponent,
        children: [
          { path: '', component: CoursesListComponent },
          { path: 'create', component: CreateCourseComponent },
          { path: ':id', component: CreateCourseComponent },
        ]
      },
      {
        path: 'teachers', component: TeacherComponent,
        children: [
          { path: '', component: TeacherListComponent },
          { path: 'create', component: RegisterTeacherComponent },
          { path: ':id', component: RegisterTeacherComponent },
        ]
      },
      {
        path: 'enroll', component: EnrollComponent,
        children: [
          { path: '', component: SelectCourseComponent },
          { path: ':id', component: SelectStudentsComponent },
          // { path: '**', redirectTo: 'select-course', pathMatch: 'full' },
        ]
      },
      
      // { path: 'assistance', component: AssignCourseComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ],

    canActivate: [ValidSessionGuard]
  },

];

export default routes;
