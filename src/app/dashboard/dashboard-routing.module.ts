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
import { AssistanceComponent } from "./home-courses/assistance/assistance.component";
import { SelectCourseAssistanceComponent } from "./home-courses/select-course-assistance/select-course-assistance.component";
import { RoleGuard } from "../shared/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      { 
        path: '', 
        component: HomeCoursesComponent, 
        children: [
          { path: '', component: SelectCourseAssistanceComponent },
          { path: 'assistance/:id', component: AssistanceComponent },
          
        ],
        canActivate:[RoleGuard],
        data: { expectedRole: ['teacher'] }
      },

      {
        path: 'students', component: StudentsComponent,
        children: [
          { path: '', component: StudentsListComponent },
          { path: 'create', component: RegisterStudentComponent },
          { path: ':id', component: RegisterStudentComponent },
        ],
        canActivate:[RoleGuard],
        data: { expectedRole: ['admin'] }
      },
      
      {
        path: 'courses', component: CoursesComponent,
        children: [
          { path: '', component: CoursesListComponent },
          { path: 'create', component: CreateCourseComponent },
          { path: ':id', component: CreateCourseComponent },
        ],
        canActivate:[RoleGuard],
        data: { expectedRole: ['admin'] }
      },
      {
        path: 'teachers', component: TeacherComponent,
        children: [
          { path: '', component: TeacherListComponent },
          { path: 'create', component: RegisterTeacherComponent },
          { path: ':id', component: RegisterTeacherComponent },
        ],
        canActivate:[RoleGuard],
        data: { expectedRole: ['admin'] }
      },
      {
        path: 'enroll', component: EnrollComponent,
        children: [
          { path: '', component: SelectCourseComponent },
          { path: ':id', component: SelectStudentsComponent },
          // { path: '**', redirectTo: 'select-course', pathMatch: 'full' },
        ],
        canActivate:[RoleGuard],
        data: { expectedRole: ['admin','teacher'] }
      },
      
      { path: '', redirectTo: '', pathMatch: 'full' }
    ],

    canActivate: [ValidSessionGuard]
  },

];

export default routes;
